#!/usr/bin/env python3
"""Extract blog rich text to blocks, retaining links, code, and nested lists."""
import json
import re
import sys
import urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return ''.join(x if isinstance(x, str) else x.text() for x in self.children)

class ArticleParser(HTMLParser):
    VOID = {'img','br','hr','input','meta','link','source','wbr','area','base','embed','param','track','col'}
    def __init__(self, base=''):
        super().__init__(); self.root = Node(); self.stack = [self.root]; self.base = base
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs); self.stack[-1].children.append(n)
        if tag not in self.VOID: self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]; break
    def handle_data(self, data): self.stack[-1].children.append(data)
    def nodes(self, n=None):
        n = n or self.root
        for x in n.children:
            if isinstance(x, Node):
                yield x; yield from self.nodes(x)
    @property
    def title(self):
        return next((n.text().strip() for n in self.nodes() if n.tag == 'h1'), None)
    def inline(self, n):
        if isinstance(n, str): return n
        text = ''.join(self.inline(x) for x in n.children)
        if n.tag == 'a' and n.attrs.get('href'):
            url = urljoin(self.base, n.attrs['href'])
            return '[' + text + '](' + url.replace(' ', '%20').replace(')', '%29') + ')'
        if n.tag in ('strong','b'): return '**' + text + '**'
        if n.tag in ('em','i'): return '*' + text + '*'
        if n.tag == 'code':
            fence = '`' * (max([len(x) for x in re.findall(r'`+', text)] or [0]) + 1)
            return fence + ' ' + text + ' ' + fence
        if n.tag == 'br': return '\n'
        if n.tag == 'img': return '![' + n.attrs.get('alt','') + '](' + urljoin(self.base,n.attrs.get('src','')) + ')'
        return text
    def render(self, n, depth=0):
        if isinstance(n, str): return []
        if n.tag in ('script','style','nav','form'): return []
        if n.tag == 'img': return [['img', n.attrs.get('alt',''), urljoin(self.base,n.attrs.get('src',''))]]
        if n.tag == 'pre':
            text = n.text().rstrip('\n'); fence = '`' * max(3, 1 + max([len(x) for x in re.findall(r'`+', text)] or [0]))
            return [['code', fence + '\n' + text + '\n' + fence]]
        if n.tag in ('ul','ol'):
            result=[]; count=0
            for x in n.children:
                if not isinstance(x,Node) or x.tag!='li': continue
                count+=1
                body=''.join(self.inline(c) for c in x.children if not isinstance(c,Node) or c.tag not in ('ul','ol')).strip()
                result.append(['li', '  '*depth + (str(count)+'. ' if n.tag=='ol' else '- ') + body])
                for c in x.children:
                    if isinstance(c,Node) and c.tag in ('ul','ol'): result.extend(self.render(c,depth+1))
            return result
        if n.tag in ('p','h2','h3','h4','blockquote'):
            return [[n.tag, self.inline(n).strip()]] if n.text().strip() or any(isinstance(c,Node) and c.tag=='img' for c in n.children) else []
        if n.tag == 'table':
            rows=[]
            for row in self.nodes(n):
                if row.tag=='tr': rows.append([self.inline(c).strip().replace('|','\\|') for c in row.children if isinstance(c,Node) and c.tag in ('th','td')])
            if rows:
                width=max(map(len,rows));rows=[r+['']*(width-len(r)) for r in rows];rows.insert(1,['---']*width)
                return [['table','\n'.join('| '+' | '.join(row)+' |' for row in rows)]]
        return [b for child in n.children for b in self.render(child,depth)]
    @property
    def blocks(self):
        roots=[n for n in self.nodes() if 'u-rich-text-blog' in n.attrs.get('class','').split() and 'w-richtext' in n.attrs.get('class','').split()]
        return [block for root in roots for block in self.render(root)]

def main():
    url=sys.argv[1]
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=30) as r: html=r.read().decode()
    p=ArticleParser(url);p.feed(html)
    if not p.blocks: raise ValueError('Article body not found; do not publish an empty extraction')
    date=re.search(r'"datePublished"\s*:\s*"([^"]+)"',html)
    print(json.dumps({'url':url,'title':p.title,'published':date[1] if date else None,'blocks':p.blocks},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
