/*
 * This JavaScript file defines two functions that enable the creation
 * of collapsible elements on a web page. The function 'addCollapsibleListeners'
 * finds all HTML elements with the class 'collapsible' and adds a click event
 * listener to them. When a collapsible element is clicked, the function
 * 'toggleCollapsible' is called. This function toggles the class 'active'
 * on the clicked element, and sets the height of its associated content to
 * either the scroll height or 0 pixels, depending on whether the element is
 * expanded or collapsed. The function also updates the text of the collapsible
 * element to show either a down-pointing or right-pointing arrow depending on
 * whether the element is expanded or collapsed.
 *
 * When the JavaScript file is loaded, it adds an event listener to the 'load'
 * event of the window object. When the page finishes loading, the function
 * 'addCollapsibleListeners' is called to set up the collapsible elements.
 */


// adds a listener to each collapsible button
function addCollapsibleListeners() {
  const collapsibles = document.querySelectorAll("button.collapsible"); // get a list of all collapsible buttons
  // for each collapsible class
  collapsibles.forEach((collapsible) => {

    collapsible.addEventListener("click", toggleCollapsible); // add a click event listener

    //if its not labeled active
    if (!collapsible.classList.contains("active")) {
      collapseCollapsible(collapsible); // expand
    }

  });
}


function expandCollapsible(collapsibleButton) {
  var content = collapsibleButton.nextElementSibling; // get the content of the collapsible
  content.style.maxHeight = content.scrollHeight + "px"; // set height to scroll height
  collapsibleButton.innerText = collapsibleButton.innerText.substring(0, collapsibleButton.innerText.length-1) + "\u23F7"; // add a down pointing symbol to it
}

function collapseCollapsible(collapsibleButton) {
  var content = collapsibleButton.nextElementSibling; // get the content of the collapsible
  content.style.maxHeight = "0px"; // set the height to 0
  collapsibleButton.innerText = collapsibleButton.innerText.substring(0, collapsibleButton.innerText.length-1) + "\u23F5"; // add a right pointing symbol to it
}


function toggleCollapsible() {

  // if the collapsible is fully extended
  if (this.classList.contains("active")) {
    collapseCollapsible(this); // collapse the collapsible
  }

  // if the collapsible is NOT fully extended
  else {
    expandCollapsible(this); // expand the collapsible
  }

  this.classList.toggle("active"); // toggle the status of the collapsible

}

// when this file is loaded, run the addCollapsibleListeners() function
window.addEventListener('load', function () {
  addCollapsibleListeners();
});