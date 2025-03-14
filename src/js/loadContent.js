var currSidebar = null; // current sidebar displayed
var currPage = null; // current page loaded
var page = null; // page the user is trying to reach

function getCurrPageName() {
    const queryString = window.location.search; // get current page url
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page'); // get the page param
    if (page == null || page == ""){
        return "home"
    }
    return page
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
    const HTMLElement = document.getElementById(element);
    const script = document.createElement("script");
    script.src = `/pages/${page}/src/js/${file}`;
    script.async = true;
    HTMLElement.appendChild(script);
}

function insertSidebar(element, file){

    // what about if the homebar is already loaded and we visit home?

    // does page have a dedicated sidebar
    if(file != null){
        // is that sidebar already loaded?
        if(currSidebar == page){
            // do nothing
            console.log("This page has a dedicated sidebar but its already been loaded");
        }
        else{
            // load that pages sidebar
            console.log("This page has a dedicated sidebar but it hasn't been loaded yet");
            const HTMLElement = document.getElementById(element);
            const path = `/pages/${page}/${file}`;

            loadHTML(path, function(newHTML){
                if(currSidebar != page){
                    HTMLElement.innerHTML = newHTML;
                    currSidebar = page;
                }
            });
        }
    }
    else{
        // is the home sidebar already loaded?
        if(currSidebar == "home"){
            // do nothing
            console.log("This page does not have a dedicated sidebar but the home sidebar is already loaded");
        }
        else{
            // load the home page sidebar
            console.log("This page does not have a dedicated sidebar and the home sidebar is not already loaded");
            const HTMLElement = document.getElementById(element);
            const path = "/pages/home/sidebar.html";

            loadHTML(path, function(newHTML){
                if(currSidebar != page){
                    HTMLElement.innerHTML = newHTML;
                    currSidebar = page;
                }
            });
        }
    }
}

function insertHTML(element, file){
    const HTMLElement = document.getElementById(element);

    loadHTML(`/pages/${page}/${file}`, function(newHTML){
        if(currPage != page){
            HTMLElement.innerHTML = newHTML;
            currPage = page;
            // history.pushState({ page: page }, "", `/?page=${page}`);
            requestAnimationFrame(() => Prism.highlightAll()); // ensure prism runs when new content loads
        }
    });
}

function parseJSON(data){
    insertSidebar("sidebar", data.sidebar);
    if (data.styles != null) {
        insertStyles(data.styles);
    }
    if (data.homePage != null) {
        insertHTML("content", data.homePage);
    }
    if (data.scripts != null) {
        insertScripts("content", data.scripts);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    page = getCurrPageName();
    loadJSON(`/pages/${page}/src/json/page.json`, parseJSON);
});

document.addEventListener('click', function(event) { 
    if (event.target.classList.contains('internal-link') && event.target.hasAttribute('href')) {
        event.preventDefault();
        console.log("internal links disabled");
    }
});