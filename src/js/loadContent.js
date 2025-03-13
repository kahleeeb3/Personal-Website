/*
    1. User navigates to /?page=<pageName>
    2. User clicks a link to /?page=<pageName>
*/

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

function insertHTML(element, file){
    const HTMLElement = document.getElementById(element);

    loadHTML(`/pages/${page}/${file}`, function(newHTML){
        if(currPage != page){
            HTMLElement.innerHTML = newHTML;
            currPage = page;
            history.pushState({ page: page }, "", `/?page=${page}`);
        }
    });
}

function parseJSON(data){
    if (data.homePage != null) {
        insertHTML("content", data.homePage);
    }
    if (data.scripts != null) {
        insertScripts("content", data.scripts);
    }
    if (data.styles != null) {
        insertStyles(data.styles);
    }
    // if (data.sidebar != null) {
    //     console.log("updating sidebar");
    // }    
}

document.addEventListener("DOMContentLoaded", function () {
    page = getCurrPageName();
    loadJSON(`/pages/${page}/src/json/page.json`, parseJSON);
});