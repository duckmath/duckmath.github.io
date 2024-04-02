function abBlank(url, title) {
  console.log("abBlank");
  let blank = (window.open()).document;
  blank.title = title;
  let frame = blank.createElement("iframe"); // why does create element have to be a function of class document?
  frame.width = "100%";
  frame.height = "100%";
  frame.style.position = "fixed";
  frame.style.top = '0';
  frame.style.left = '0';
  frame.src = url;
  blank.body.appendChild(frame);
}
abBlank("https://duckmath.org", "")