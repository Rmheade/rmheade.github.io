function beep(x) {
    var iframe = document.createElement("iframe")
    var html = "<body>Foo</body>"
    document.getElementById('all').hidden = true
    iframe.src = x + encodeURI(html)
    document.body.appendChild(iframe)
  }  