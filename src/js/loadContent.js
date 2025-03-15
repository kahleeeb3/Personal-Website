var currSidebar = null; // current sidebar displayed
var currPage = null; // current page loaded
var page = null; // page the user is trying to reach

function getCurrPageName() {
    const queryString = window.location.search; // get current page url
    const urlParams = new URLSearchParams(queryString);
    const pageParam = urlParams.get('page'); // get the page param
    if (pageParam == null || page == ""){
        return "home";
    }
    return pageParam;
}

function loadHTML(file, callback) {
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

function insertStyles(file){
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/pages/${page}/src/css/${file}`;
    document.head.appendChild(link);
}

function insertScripts(element, file){
    // Note: wont this keep appending multiple scripts? Should look into that.
    const HTMLElement = document.getElementById(element);
    const script = document.createElement("script");
    script.src = `/pages/${page}/src/js/${file}`;
    script.async = true;
    HTMLElement.appendChild(script);
}

function insertSidebar(element, path){
    const HTMLElement = document.getElementById(element);

    loadHTML(path, function(newHTML){
        HTMLElement.innerHTML = newHTML;
    });
}

function insertHTML(element, file){
    const HTMLElement = document.getElementById(element);

    loadHTML(`/pages/${page}/${file}`, function(newHTML){
        if(currPage != page){
            HTMLElement.innerHTML = newHTML;
            currPage = page;
            requestAnimationFrame(() => Prism.highlightAll()); // ensure prism runs when new content loads
        }
    });
}

function parseJSON(data){
    // do nothing if the page is already loaded
    if(page == currPage){
        return;
    }

    // Get correct sidebar
    if(data.sidebar == null){
        if(currSidebar != "home"){
            console.log("loading /pages/home/sidebar.html");
            insertSidebar("sidebar", "/pages/home/sidebar.html");
            currSidebar = "home";
        }
    }
    else{
        if(currSidebar != page) {
            console.log(`loading /pages/${page}/${data.sidebar}`);
            insertSidebar("sidebar", `/pages/${page}/${data.sidebar}`);
            currSidebar = page;
        }
    }

    // get styles for the page
    if (data.styles != null) {
        insertStyles(data.styles);
    }

    // get the page we need
    if (data.homePage != null) {
        insertHTML("content", data.homePage);
    }

    // get the script we need
    if (data.scripts != null) {
        insertScripts("content", data.scripts);
    }
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