const closeButton = document.createElement("button");
closeButton.textContent = "Back";
closeButton.style.position = "absolute";
closeButton.style.top = "20px";
closeButton.style.right = "20px";
closeButton.style.zIndex = "1001";
closeButton.style.padding = "12px 20px";
closeButton.style.background = "rgba(0, 0, 0, 0.6)";
closeButton.style.color = "#D0BF94";
closeButton.style.border = "2px solid #B95A25";
closeButton.style.borderRadius = "10px";
closeButton.style.cursor = "pointer";
closeButton.style.fontFamily = "Bokor";
closeButton.style.fontSize = "1rem";
closeButton.style.transition = "all 0.2s ease";

closeButton.onmouseover = () => {
  closeButton.style.background = "rgba(0, 0, 0, 0.8)";
  closeButton.style.boxShadow = "0 0 10px #B95A25";
};
closeButton.onmouseout = () => {
  closeButton.style.background = "rgba(0, 0, 0, 0.6)";
  closeButton.style.boxShadow = "none";
};
