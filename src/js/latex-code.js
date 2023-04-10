/*
 * This JavaScript file defines a custom HTML element <latex-code>
 * that renders LaTeX code as an image using the CodeCogs LaTeX
 * Equation Editor (https://www.codecogs.com/latex/eqneditor.php).
 * The <latex-code> element is replaced with a centered image of
 * the rendered LaTeX code.
 *
 * The LaTeX code is passed as the innerHTML of the <latex-code>
 * element, and can be styled using CSS classes applied to the
 * <latex-code> element.
 */


// Define a new class that extends HTMLElement
class LatexCode extends HTMLElement {
    constructor() {
        super(); // Call the constructor of the HTMLElement class
        // Store the innerHTML of the element as the "_latexCode" property
        this._latexCode = this.innerHTML.trim();
    }

    // This method is called when the element is added to the DOM
    connectedCallback() {
        // Construct the URL for the LaTeX image using the "_latexCode" property
        const imageSrc =
            "https://latex.codecogs.com/svg.image?" +
            encodeURIComponent(this._latexCode);

        // Create an <img> element with the source and alt attributes set accordingly
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", imageSrc);
        // imageElement.setAttribute("alt", this._latexCode); // set the alt of the image
        // Get the class attribute of the <latex-code> element;
        const imgStyle = this.getAttribute("class"); 
        // Set the style attribute of the new <img> element based on the class of the <latex-code> element
        imageElement.setAttribute("style", imgStyle);
        imageElement.setAttribute("id", "latex-code"); // set the class as letex code

        // Create a <div> element with the image as its child
        const divElement = document.createElement("div");
        // Align the <div> element to the center
        divElement.setAttribute("align", "center");
        // Append the <img> element to the <div> element
        divElement.appendChild(imageElement);

        // Insert the <div> element before the <latex-code> element
        this.parentNode.insertBefore(divElement, this);
        // Remove the <latex-code> element from the DOM
        this.parentNode.removeChild(this);
    }
}

// Register the custom element with the browser
customElements.define("latex-code", LatexCode);
