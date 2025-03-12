/*
User is going to navigate ?page=<pageName>

- if no page provided:
    - load: pages/home/home.html
- else:
    - load: pages/<pageName>/<pageName>
    - if pages/<pageName>/sidebar.html exists:
        - load: pages/<pageName>/sidebar.html
*/

var currSidebar = "None"; // store which sidebar is currently showing

function getCurrPageName() {
    const queryString = window.location.search; // get current page url
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page'); // get the page param
    return page
}

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
    const HTMLElement = document.getElementById(element);

    readTextFile(file, function(content) {
        HTMLElement.innerHTML = content;
    });
}

function getPage(page) {
    // if no page was passed, set page to home
    if (page == null || page.trim() == '') {
        page = "home";
    }

    replaceHTML("content", `pages/${page}/${page}.html`);

    // replace sidebar if pages/<pageName>/sidebar.html exists:
    if (currSidebar != page){
        const HTMLElement = document.getElementById("sidebar");
        readTextFile(`pages/${page}/sidebar.html`, function(content) {
            // user can leave an empty sidebar.html file to remove errors
            if (content != "") {
                HTMLElement.innerHTML = content;
                currSidebar = page;
            }
        });

    }
    // history.pushState({ page: page }, "", `/?page=${page}`);
}


function handleInternalLink(href) {
    // handles links to internal web pages
    const url = new URL(href); // get url
    const page = url.searchParams.get('page'); // get page name
    getPage(page);
}

/*
function handlePopState(event) {
    // Handle the state when the user presses the back/forward button
    const page = event.state ? event.state.page : "home"; // Default to "home" if no state exists
    replaceHTML("content", `${page}.html`);
}
*/

document.addEventListener("DOMContentLoaded", function () {
    getPage(getCurrPageName());

     
    // listen for internal links
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('internal-link') && event.target.hasAttribute('href')) {
            event.preventDefault();
            handleInternalLink(event.target.href);
        }
    });

    // Listen for changes in the history (back/forward buttons)
    // window.addEventListener('popstate', handlePopState);
    
});