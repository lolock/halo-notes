"""A matching Markdown file alone must not count as a published article."""
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import halo_publish as publisher


class StaticVerificationTests(unittest.TestCase):
    def test_verification_checks_html_styles_and_legacy_mapping(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / 'repo'
            fixture = Path(temporary) / 'built'
            state = Path(temporary) / 'state'
            (root / 'articles').mkdir(parents=True)
            (root / 'articles/a.md').write_text('# Article\n\nBody')
            item = {'file': 'articles/a.md', 'source': 'https://example.org/a',
                    'title': 'Article', 'url': 'read/a.html'}
            files = {
                'articles.json': json.dumps([item]),
                'articles/a.md': (root / 'articles/a.md').read_text(),
                'read/a.html': '<!doctype html><article><h1>Article</h1><p>Body</p></article>',
                'static-articles.json': json.dumps({'articles/a.md': 'read/a.html'}),
                'article-build.json': json.dumps({'articles': {'articles/a.md': {'url': 'read/a.html'}}}),
            }
            for filename in ('reader.html', 'article.html', 'assets/reader.js', 'assets/reader.css',
                             'assets/editorial.css', 'assets/article-content.js', 'assets/bilingual.js',
                             'assets/bilingual.css', 'assets/vendor/marked.js', 'assets/vendor/purify.js'):
                files[filename] = 'expected ' + filename
            for filename, body in files.items():
                target = fixture / filename
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(body)

            def run(*args):
                if args[0] == 'node':
                    shutil.copytree(fixture, args[args.index('--output') + 1])
                    return 'Built'
                self.assertEqual(args, ('git', 'rev-parse', 'HEAD'))
                return 'a' * 40

            site = 'https://example.org/notes/'
            for stale in (None, 'read/a.html', 'assets/reader.css', 'static-articles.json', 'articles/a.md'):
                with self.subTest(stale=stale):
                    def fetch(url):
                        self.assertTrue(url.startswith(site))
                        filename = url.removeprefix(site)
                        return ('stale' if filename == stale else files[filename]).encode()
                    with patch.object(publisher, 'ROOT', root), patch.object(publisher, 'STATE', state), \
                            patch.object(publisher, 'run', side_effect=run), patch.object(publisher, 'fetch', side_effect=fetch):
                        if stale:
                            with self.assertRaises(ValueError):
                                publisher.verify(['articles/a.md'], site)
                        else:
                            result = publisher.verify(['articles/a.md'], site)
                            self.assertEqual(result['status'], 'verified')
                            self.assertEqual(result['articles'][0]['url'], site + 'read/a.html')
                            self.assertEqual(len(result['articles'][0]['html_sha256']), 64)


if __name__ == '__main__':
    unittest.main()
