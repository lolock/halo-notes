import concurrent.futures
import importlib.util
import json
import multiprocessing
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import halo_common as common
import halo_queue as queue
import halo_publish as publisher
from extract_claude_blog import ArticleParser

class PipelineTests(unittest.TestCase):
    def test_source_identity(self):
        self.assertEqual(common.source_key('https://twitter.com/author/status/123?s=20&utm_source=x'),common.source_key('https://x.com/other/status/123'))
        self.assertNotEqual(common.source_key('https://example.org/?id=1'), common.source_key('https://example.org/?id=2'))
    def test_resources_include_video_not_code(self):
        md='[video](/halo-notes/articles/assets/a.mp4)\n![image](articles/assets/a.jpg)\n```html\n<a href="fake">demo</a>\n```\n`[x](fake)`'
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
    def test_pages_failure_does_not_finish_queue(self):
        with patch.object(publisher,'fetch',side_effect=RuntimeError('Pages not deployed')):
            with self.assertRaises(RuntimeError):queue.finish('one','articles/a.md')

if __name__=='__main__':unittest.main()
