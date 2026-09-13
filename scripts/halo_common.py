"""Shared publication identity, locking, and durable state helpers (stdlib only)."""
import contextlib
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode, unquote

ROOT = Path(__file__).resolve().parents[1]
STATE = Path(os.environ.get('HALOS_STATE_DIR', Path.home() / '.hermes/state/halos_publish_queue'))

def source_key(value):
    value = str(value or '').strip().strip('<>')
    u = urlsplit(value)
    if u.scheme not in ('http', 'https'):
        return value
    host = (u.hostname or '').lower().removeprefix('www.')
    if host in ('x.com', 'twitter.com', 'mobile.twitter.com'):
        host = 'x.com'
        m = re.search(r'/(?:status|statuses)/(\d+)', u.path)
        if m:
            return 'https://x.com/i/status/' + m[1]
    query = [(k, v) for k, v in parse_qsl(u.query) if not k.lower().startswith('utm_') and k.lower() not in ('fbclid', 'gclid')]
    return urlunsplit(('https', host + (':' + str(u.port) if u.port else ''), u.path.rstrip('/'), urlencode(sorted(query)), ''))

def article_path(value):
    value = str(value)
    if not value.startswith('articles/'):
        value = 'articles/' + value
    p = Path(value)
    if p.is_absolute() or '..' in p.parts or p.suffix != '.md' or len(p.parts) != 2:
        raise ValueError('Invalid article path: ' + value)
    return p.as_posix()

def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def atomic_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=path.name + '.', dir=path.parent)
    try:
        with os.fdopen(fd, 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write('\n')
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)

@contextlib.contextmanager
def locked(path):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('a') as f:
        fcntl.flock(f, fcntl.LOCK_EX)
        yield

def local_targets(markdown):
    """Images AND links, including local videos and topic pages."""
    # Ignore example links inside fenced and inline code, and escaped brackets.
    lines = []; fence = None
    for line in markdown.splitlines():
        match = re.match(r'^\s{0,3}(`{3,}|~{3,})', line)
        if match:
            marker = match[1]
            if fence is None: fence = marker
            elif marker[0] == fence[0] and len(marker) >= len(fence): fence = None
            continue
        if fence is None: lines.append(line)
    markdown = re.sub(r'(`+).*?\1', '', '\n'.join(lines))
    markdown = markdown.replace(r'\[', '').replace(r'\]', '')
    targets = re.findall(r'!?\[[^\]]*\]\(<?([^\s)>]+)', markdown)
    targets += re.findall(r'(?:src|href)=[\"\']([^\"\']+)', markdown)
    result = set()
    for target in targets:
        u = urlsplit(target)
        if u.scheme or u.netloc or not u.path:
            continue
        path = unquote(u.path).removeprefix('/halo-notes/').removeprefix('./')
        if path.startswith('/') or '..' in Path(path).parts:
            raise ValueError('Invalid local resource: ' + target)
        if path.endswith('/'):
            path += 'index.html'
        result.add(path)
    return sorted(result)
