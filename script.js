function beep(url) {
  document.getElementById('all').hidden = true;

  var iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.zIndex = "1000";

  var closeButton = document.createElement("button");
  closeButton.textContent = "Back";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.zIndex = "1001";
  closeButton.style.padding = "10px";
  closeButton.style.background = "black";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.font = "Bokor";

  closeButton.onclick = function () {
    document.body.removeChild(iframe);
    document.body.removeChild(closeButton);
    document.getElementById('all').hidden = false;
  };

  document.body.appendChild(iframe);
  document.body.appendChild(closeButton);
}