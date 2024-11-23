function beep(x) {
    var iframe = document.createElement("iframe")
    var html = "<body>Foo</body>"
    document.getElementById('all').hidden = true
    iframe.src = x + encodeURI(html)
    document.getElementById('grid').appendChild(iframe)
    console.log("iframe.contentWindow =", iframe.contentWindow)
  }  