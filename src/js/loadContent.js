var currSidebar = null; // current sidebar displayed
var currPage = null; // current page loaded
var page = null; // page the user is trying to reach

function readFile(file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }
            return response.text();
        })
        .then(data => callback(data))
        .catch(error => console.error("Error:", error));
}

function insertStyles(element, path) {
    const HTMLElement = document.getElementById(element);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;
    HTMLElement.appendChild(link);
}

function insertScripts(element, path){
    const HTMLElement = document.getElementById(element);
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    HTMLElement.appendChild(script);
}

function insertHTML(element, path, callback){
    const HTMLElement = document.getElementById(element);

    readFile(path, function(newHTML){
        HTMLElement.innerHTML = newHTML;
        currPage = page;
        if (callback) {
            callback();
        }
    });
}

function parseJSON(data){
    // if page is already loaded, do nothing
    if(page == currPage) return;

    // get the page we need
    if (data.homePage != null) {
        insertHTML("content", `/pages/${page}/${data.homePage}`, function(){
            currPage = page; // set new homepage
            requestAnimationFrame(() => Prism.highlightAll()); // syntax highlight

            // get any scripts we need
            if (data.scripts != null) {
                insertScripts("content", `/pages/${page}/src/js/${data.scripts}`);
            }

            // get any styles we need
            if (data.styles != null){
                insertStyles("content", `/pages/${page}/src/css/${data.styles}`);
            }
        });
    }

    // Get correct sidebar
    if(data.sidebar == null){
        if(currSidebar != "home"){
            console.log("loading /pages/home/sidebar.html");
            insertHTML("sidebar", "/pages/home/sidebar.html");
            currSidebar = "home";
        }
    }
    else{
        if(currSidebar != page) {
            console.log(`loading /pages/${page}/${data.sidebar}`);
            insertHTML("sidebar", `/pages/${page}/${data.sidebar}`);
            currSidebar = page;
        }
    }
}

function getCurrPageName() {
    const queryString = window.location.search; // get current page url
    const urlParams = new URLSearchParams(queryString);
    const pageParam = urlParams.get('page'); // get the page param
    if (pageParam == null || page == ""){
        return "home";
    }
    return pageParam;
}

function loadJSON(file, callback){
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error("Error:", error));
}

// listen for page loads
document.addEventListener("DOMContentLoaded", function () {
    // get the desired url
    page = getCurrPageName();
    // load desired page
    loadJSON(`/pages/${page}/src/json/page.json`, parseJSON);
});

// listen for user hitting back button
window.addEventListener('popstate', function(event){
    // get the desired url
    page = getCurrPageName();
    // load desired page
    loadJSON(`/pages/${page}/src/json/page.json`, parseJSON);
});

// listen for clicking internal links
document.addEventListener('click', function(event) { 
    if (event.target.classList.contains('internal-link') && event.target.hasAttribute('href')) {
        // prevent default behavior
        event.preventDefault();

        // get the desired page
        const url = new URL(event.target.href);
        page = url.searchParams.get('page');

        // if no page, set to home page
        if (page == null || page == ""){
            page = "home"
        }

        // load desired page and push browser history
        loadJSON(`/pages/${page}/src/json/page.json`, parseJSON);
        history.pushState(null, page, event.target.href);
        document.title = page.replace(/\b\w/g, char => char.toUpperCase()); // capitalize the first letter
    }
});