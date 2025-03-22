function readTextFile(file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }
            return response.text();
        })
        .then(text => callback(text))
        .catch(error => console.error("Error:", error));
}

function replaceHTML(element, file) {
    // replaces elements inner HTML with text from a file
    var HTMLElement = document.getElementById(element);

    readTextFile(file, function(content) {
        HTMLElement.innerHTML = content;
    });

}

function getPage() {
    // user will pass /?page=<pageName>
    const queryString = window.location.search; // get current page url
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page'); // get the page param

    // check if a page was passed
    if (page !== null && page.trim() !== '') {
        replaceHTML("content", `${page}.html`); // insert main text
    } else {
        // if no page passed, load home.html
        replaceHTML("content", "home.html"); // insert main text
    }
}

function getSidebar() {
    replaceHTML("sidebar", "sidebar.html");
}