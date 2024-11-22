function beep(x) {
    var iframe = document.createElement("iframe")
    var html = "<body>Foo</body>"
    iframe.src = x + encodeURI(html)
    document.body.appendChild(iframe)
    console.log("iframe.contentWindow =", iframe.contentWindow)
  }  