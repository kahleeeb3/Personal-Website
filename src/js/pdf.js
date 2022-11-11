let open = 0;
function myFunction(link, ElementId) {
  if (open == 0) {
    document.getElementById("PDFPreview").innerHTML =
      '<iframe id="iframe" src="files/' +
      link +
      '" width="700" height="450"></iframe>';
    document.getElementById(ElementId).innerHTML = "Close Preview";
    open = 1;
  } else {
    document.getElementById("PDFPreview").innerHTML = "";
    document.getElementById(ElementId).innerHTML = "Open Preview";
    open = 0;
  }
}
