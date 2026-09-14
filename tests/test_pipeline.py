import concurrent.futures
import importlib.util
import json
import multiprocessing
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch, MagicMock
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import halo_common as common
import halo_queue as queue
import halo_publish as publisher
from extract_claude_blog import ArticleParser

class PipelineTests(unittest.TestCase):
    def test_cover_url_keeps_parentheses(self):
        from fix_articles_metadata import first_image_url
        self.assertEqual(first_image_url('![Cover](https://example.org/image%20(1).png)'), 'https://example.org/image%20(1).png')
    def test_source_identity(self):
        self.assertEqual(common.source_key('https://twitter.com/author/status/123?s=20&utm_source=x'),common.source_key('https://x.com/other/status/123'))
        self.assertNotEqual(common.source_key('https://example.org/?id=1'), common.source_key('https://example.org/?id=2'))
    def test_resources_include_video_not_code(self):
        md='[video](/halo-notes/articles/assets/a.mp4)\n![image](articles/assets/a.jpg)\n```html\n<a href="fake">demo</a>\n```\n`[x](fake)`\nhref="css/style.css" is a code explanation'
        self.assertEqual(common.local_targets(md),['articles/assets/a.jpg','articles/assets/a.mp4'])
    def test_path_boundary(self):
        for p in ('../private.md','articles/../x.md','/tmp/x.md','articles/x.html'):
            with self.assertRaises(ValueError): common.article_path(p)
    def test_extraction_preserves_semantics(self):
        p=ArticleParser('https://example.org/blog/a')
        p.feed('<h1>Title</h1><div class="u-rich-text-blog w-richtext"><p>See <a href="/ref">reference</a> and <code>a&lt;b</code>.</p><pre><code>print(42)\nnext()</code></pre><ol><li>One<ul><li>Child</li></ul></li><li>Two</li></ol><img src="/a.png"></div>')
        text='\n'.join(b[1] for b in p.blocks)
        self.assertIn('[reference](https://example.org/ref)',text)
        self.assertIn('print(42)\nnext()',text)
        self.assertIn('  - Child',text)
        self.assertIn('2. Two',text)
        self.assertEqual(p.blocks[-1],['img','','https://example.org/a.png'])

    def test_extraction_includes_outer_hero_and_testimonials_once(self):
        html = '''<h1>Title</h1>
        <div class="hero_blog_description_wrap"><div class="w-richtext"><p>Hero summary</p></div></div>
        <div class="u-rich-text-blog w-richtext"><p>Hero summary</p><p>Body paragraph</p><blockquote>A partner quote.\n\n- Partner, Co-founder</blockquote><h2>Getting started</h2><p>Finish here</p></div>
        <div class="card_testimonial_col_wrap"><p class="card_testimonial_col_text">A partner quote.</p><div class="card_testimonial_col_caption">Partner, Co-founder</div></div>
        <div class="card_testimonial_col_wrap"><p class="card_testimonial_col_text">A partner quote.</p><div class="card_testimonial_col_caption">Partner, Co-founder</div></div>'''
        p = ArticleParser('https://example.org/blog/a')
        p.feed(html)
        self.assertEqual([b[1] for b in p.blocks], [
            'Hero summary', 'Body paragraph', 'A partner quote.\n\n- Partner, Co-founder', 'Getting started', 'Finish here'
        ])
        self.assertEqual(sum('Hero summary' in b[1] for b in p.blocks), 1)
        self.assertEqual(sum('A partner quote.' in b[1] for b in p.blocks), 1)

    def test_extraction_keeps_testimonial_links(self):
        p = ArticleParser('https://example.org/blog/a')
        p.feed('''<div class="u-rich-text-blog w-richtext"><p>Body</p></div>
        <div class="card_testimonial_col_wrap"><p class="card_testimonial_col_text">Build in <a href="/app">the app</a>.</p><div class="card_testimonial_col_caption"><a href="/partner">Partner</a></div></div>''')
        self.assertIn('[the app](https://example.org/app)', p.blocks[-1][1])
        self.assertIn('- [Partner](https://example.org/partner)', p.blocks[-1][1])
    def test_claim_and_retry(self):
        with tempfile.TemporaryDirectory() as td, patch.object(queue,'STATE',Path(td)):
            queue.init();item={'id':'one','source':'https://x.com/a/status/123','status':'pending','attempts':0}
            common.atomic_json(Path(td)/'pending/one.json',item)
            with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
                claims=list(pool.map(lambda _:queue.claim(),range(8)))
            self.assertEqual(sum(c is not None for c in claims),1)
            self.assertFalse((Path(td)/'pending/one.json').exists())
            claimed=json.loads((Path(td)/'processing/one.json').read_text())
            queue.move(claimed,'processing','failed')
            with self.assertRaises(ValueError):queue.retry('one',[{'source':'https://twitter.com/b/status/123'}])
            queue.retry('one',[])
            self.assertEqual(json.loads((Path(td)/'pending/one.json').read_text())['attempts'],0)
    def test_scan_failure_is_not_empty_success(self):
        with tempfile.TemporaryDirectory() as td, patch.object(queue,'STATE',Path(td)/'queue'):
            queue.init();common.atomic_json(Path(td)/'halos_config.json',{'hosts':['offline'],'inbox':'/none'})
            with patch.object(queue,'published',return_value=[]),patch.object(queue,'inventory',side_effect=RuntimeError('offline')):
                with self.assertRaises(RuntimeError):queue.scan()
            status=json.loads((Path(td)/'queue/detector_status.json').read_text())
            self.assertFalse(status['source_available']);self.assertEqual(status['failure_streak'],1)
    def test_failed_items_visible_and_scan_idempotent(self):
        with tempfile.TemporaryDirectory() as td, patch.object(queue,'STATE',Path(td)/'queue'):
            queue.init();common.atomic_json(Path(td)/'halos_config.json',{})
            rows=[{'name':'a.md','text':'---\nurl: https://x.com/u/status/123\n---\n中文内容','bytes':50}]
            with patch.object(queue,'published',return_value=[]),patch.object(queue,'inventory',return_value=('mac',rows)):
                self.assertEqual(queue.scan()['enqueued'],1)
                self.assertEqual(queue.scan()['enqueued'],0)
    def test_validation_failure_rolls_back_only_bundle(self):
        with tempfile.TemporaryDirectory() as td:
            root=Path(td)/'repo';root.mkdir();bundle=Path(td)/'bundle';(bundle/'articles').mkdir(parents=True)
            (root/'articles.json').write_text('[]')
            (root/'keep.txt').write_text('existing work')
            (bundle/'articles/new.md').write_text('# new')
            (bundle/'entry.json').write_text(json.dumps({'file':'articles/new.md','title':'new','source':'https://example.org/new'}))
            def fake_run(*args):
                if args[0]=='python3':raise RuntimeError('invalid content')
                return ''
            with patch.object(publisher,'ROOT',root),patch.object(publisher,'STATE',Path(td)/'state'),patch.object(publisher,'run',side_effect=fake_run):
                with self.assertRaises(RuntimeError):publisher.publish(bundle)
            self.assertEqual((root/'articles.json').read_text(),'[]')
            self.assertFalse((root/'articles/new.md').exists())
            self.assertEqual((root/'keep.txt').read_text(),'existing work')
            self.assertTrue((bundle/'articles/new.md').exists())
    def test_incomplete_transport_read_retries(self):
        import http.client
        response=MagicMock();response.__enter__.return_value=response
        response.read.side_effect=[http.client.IncompleteRead(b'part',4),b'complete']
        with patch.object(publisher.urllib.request,'urlopen',return_value=response) as request,patch.object(publisher.time,'sleep'):
            self.assertEqual(publisher.fetch('https://example.org/article'),b'complete')
            self.assertEqual(request.call_count,2)
    def test_pages_failure_does_not_finish_queue(self):
        with patch.object(publisher,'fetch',side_effect=RuntimeError('Pages not deployed')):
            with self.assertRaises(RuntimeError):queue.finish('one','articles/a.md')

if __name__=='__main__':unittest.main()
