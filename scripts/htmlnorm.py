"""Normalize an HTML file for structural diffing.

Emits one line per start tag (attributes sorted), end tag, and non-empty
text node (whitespace collapsed). Drops comments, the generator <meta>, and
the stylesheet <link>, which are expected to differ between builds.

Usage: python3 -I scripts/htmlnorm.py path/to/file.html
"""
import re
import sys
from html.parser import HTMLParser


class Norm(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lines = []

    def _skip(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta" and a.get("name") == "generator":
            return True
        if tag == "link" and a.get("rel") == "stylesheet":
            return True
        return False

    def handle_starttag(self, tag, attrs):
        if self._skip(tag, attrs):
            return
        attrs = sorted((k, v if v is not None else "") for k, v in attrs)
        self.lines.append("<%s%s>" % (tag, "".join(' %s="%s"' % kv for kv in attrs)))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        self.lines.append("</%s>" % tag)

    def handle_data(self, data):
        t = re.sub(r"\s+", " ", data).strip()
        if t:
            self.lines.append("  " + t)


with open(sys.argv[1], encoding="utf-8") as f:
    p = Norm()
    p.feed(f.read())
print("\n".join(p.lines))
