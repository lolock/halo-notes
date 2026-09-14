import sys
import tempfile
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from version_assets import version_html

class AssetVersionTests(unittest.TestCase):
    def test_keys_follow_content_and_preserve_external_links(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'assets').mkdir()
            css = root / 'assets/theme.css'
            css.write_text('body{color:black}')
            external = '<link href="https://example.org/font.css">'
            html = '<link href="./assets/theme.css">' + external
            first = version_html(html, root)
            self.assertIn('?v=', first)
            self.assertIn(external, first)
            self.assertEqual(first, version_html(first, root))
            css.write_text('body{color:red}')
            second = version_html(first, root)
            self.assertNotEqual(first, second)
            self.assertEqual(second.count('?v='), 1)

    def test_asset_reference_cannot_escape_directory(self):
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(ValueError):
                version_html('<script src="./assets/../private.js"></script>', Path(directory))
