/*
 * Controls collapsibles HTML objects
 */


// adds a listener to each collapsible button
function addCollapsibleListeners() {
  var coll = document.getElementsByClassName("collapsible"); // get all collapsible objects
  // for each collapsible objects, add a click event listener
  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", toggleCollapsible);
  }
}

function toggleCollapsible() {
  this.classList.toggle("active"); // toggle the status of the collapsible
  var content = this.nextElementSibling; // get the content of the collapsible

  // if the collapsible is fully extended
  if (content.style.maxHeight){
    content.style.maxHeight = null; // set the height to 0
    this.innerText = "\u23F5" + this.innerText.substring(1); // add a right pointing symbol to it
  } 

  // if the collapsible is NOT fully extended
  else {
    content.style.maxHeight = content.scrollHeight + "px"; // set height to scroll height
    this.innerText = "\u23F7" + this.innerText.substring(1); // add a down pointing symbol to it
  } 
}

// when this file is loaded, run the addCollapsibleListeners() function
window.addEventListener('load', function() {
  addCollapsibleListeners();
});