import os, re


def js(m):
    return m.group(1)+m.group(3)+open(m.group(2)).read()


def css(m):
    return '<style type="text/css">'+open(m.group(2)).read()+'</style>'


if not os.path.exists("dist"):
    os.makedirs("dist")

body = open("index.html").read()
body = re.sub('(<script.+)src="([^"]+.js)"([^>]*>)', js, body)
body = re.sub('(<link.+)href="([^"]+.css)"([^>]*>)', css, body)

open("dist/index.html", "w").write(body)
