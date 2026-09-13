#!/usr/bin/env python3
"""Prepare a Chinese Inbox clip bundle; never publishes or touches shared index."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import re
import urllib.request
from urllib.parse import urlsplit,parse_qs
from halo_common import atomic_json, article_path

def prepare(item, directory, summary, category):
    text=Path(item['local_path']).read_text();body=text
    if text.startswith('---\n'):
        end=text.find('\n---\n',4)
        if end!=-1:body=text[end+5:].lstrip('\n')
    if item.get('language_hint')=='english': raise ValueError('English clip needs model bilingual translation first')
    if '\ufffd' in body: raise ValueError('Repair replacement characters against source before preparing')
    if '<video' in body: raise ValueError('Review video embed; retain poster and playable asset before preparing')
    directory=Path(directory);directory.mkdir(parents=True,exist_ok=True)
    source=item.get('source','');sid=re.search(r'/status/(\d+)',source);slug='inbox-'+(sid[1] if sid else item['id'])
    title=item['title'];filename=re.sub(r'[/\\:*?"<>|]','_',title)+'.md';relative=article_path(filename)
    urls=list(dict.fromkeys(re.findall(r'!\[[^\]]*\]\((https?://[^)\s]+)\)',body)))
    def download(pair):
        i,url=pair
        with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=40) as r:
            data=r.read();content_type=r.headers.get_content_type()
        if not content_type.startswith('image/') or not data:raise ValueError('Image response invalid: '+url)
        ext={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','image/gif':'.gif'}.get(content_type)
        if not ext:raise ValueError('Unsupported image type: '+content_type)
        rel=f'articles/assets/{slug}/{i:02d}{ext}';p=directory/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
        return url,'/halo-notes/'+rel
    with ThreadPoolExecutor(max_workers=5) as pool:mapping=dict(pool.map(download,enumerate(urls)))
    in_fence=None;out=[]
    for line in body.splitlines():
        m=re.match(r'^\s{0,3}(`{3,}|~{3,})',line)
        if m:
            if in_fence is None:in_fence=m[1]
            elif m[1][0]==in_fence[0] and len(m[1])>=len(in_fence):in_fence=None
        if in_fence is None and line.startswith('# '):line='#'+line
        out.append(line)
    normalized='\n'.join(out).rstrip()+'\n'
    for src,dst in mapping.items():normalized=normalized.replace(']('+src+')',']('+dst+')')
    # Verify the transformation preserved every line apart from heading level and media URL.
    restored=normalized
    for src,dst in mapping.items():restored=restored.replace(']('+dst+')',']('+src+')')
    original_lines=body.strip().splitlines();restored_lines=restored.strip().splitlines()
    if len(original_lines)!=len(restored_lines) or any(a!=b and '#'+a!=b for a,b in zip(original_lines,restored_lines)):
        raise ValueError('Unexpected content change during import')
    handle=urlsplit(source).path.split('/')[1] if source else '未提供'
    date=item.get('created','')[:10]
    header=f'# {title}\n\n- 原始链接：{source}\n- 作者：@{handle}\n- 发布时间：原收藏未提供\n- 收藏时间：{date}\n- X Article：{source}\n\n---\n\n'
    target=directory/relative;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(header+normalized)
    entry={'title':title,'file':relative,'date':date,'date_kind':'collected','source':source,'source_name':'X / Inbox','summary':summary,'category':category,'tags':['Vibe Coding','教程'] if 'FDE' not in title else ['FDE','AI应用','职业发展'],'quality':'A','cover':next(iter(mapping.values()),'')}
    atomic_json(directory/'entry.json',entry)
    atomic_json(directory/'source.json',{'item':item,'text':text})
    evidence={'source_sha256':hashlib.sha256(text.encode()).hexdigest(),'preserved_lines':len(original_lines),'images':len(mapping),'media':mapping,'queue_id':item['id']}
    atomic_json(directory/'manifest.json',evidence)
    return entry,evidence

def main():
    p=argparse.ArgumentParser();p.add_argument('--item',required=True);p.add_argument('--directory',required=True);p.add_argument('--summary',required=True);p.add_argument('--category',required=True);a=p.parse_args()
    entry,evidence=prepare(json.loads(Path(a.item).read_text()),a.directory,a.summary,a.category)
    print(json.dumps({'file':entry['file'],**evidence},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
