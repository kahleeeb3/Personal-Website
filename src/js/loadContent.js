currPage = null;
currSidebar = null;

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

function insertHTML(element, path, callback){
    const HTMLElement = document.getElementById(element);

    readFile(path, function(newHTML){
        HTMLElement.innerHTML = newHTML;
        if (callback) {
            callback();
        }
    });
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

function parseJSON(data){

    // get the page we need
    if(data.page != null){
        insertHTML("content", `/pages/${data.page}/${data.content}`, function(){
            currPage = data.page; // set the new page
            requestAnimationFrame(() => Prism.highlightAll()); // allow syntax highlight
            createCollapsible(); // allow collapsible

            // get any scripts we need
            if (data.scripts != null) {
                insertScripts("content", `/pages/${data.page}/src/js/${data.scripts}`);
            }

            // get any styles we need
            if (data.styles != null){
                insertStyles("content", `/pages/${data.page}/src/css/${data.styles}`);
            }

        });
    }

    // get the sidebar we need
    if(data.sidebar == null){
        if(currSidebar != "home"){
            insertHTML("sidebar", "/pages/home/sidebar.html");
            currSidebar = "home";
            // console.log("Loading default sidebar");
        }
    }
    else{
        if(currSidebar != data.page) {
            insertHTML("sidebar", `/pages/${data.page}/${data.sidebar}`);
            currSidebar = data.page;
            // console.log(`Loading ${page} Sidebar`);
        }
    }
}

function getDesiredPage(urlParams){

    // get parameters from the url
    const pageParam = urlParams.get('page') ?? "home";
    const subPageParam = urlParams.get('subpage');

    // load desired content
    loadJSON(`/pages/${pageParam}/src/json/page.json`, function(data){
        if(data.content[subPageParam-1] != null) {
            data.content = data.content[subPageParam-1];
        }
        else{
            data.content = data.content[0];
        }
        parseJSON(data);
        document.title = pageParam.replace(/\b\w/g, char => char.toUpperCase());
    });

}

// listen for page loads
document.addEventListener("DOMContentLoaded", function () {
    // get url params from browser search bar
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // load desired page
    getDesiredPage(urlParams);    
});

// listen for clicking internal links
document.addEventListener('click', function(event) { 
    if (event.target.classList.contains('internal-link') && event.target.hasAttribute('href')) {
        // prevent default behavior
        event.preventDefault();

        // get url params from internal link
        const url = new URL(event.target.href);
        const urlParams = url.searchParams;

        getDesiredPage(urlParams);

        // update history
        history.pushState(null, null, event.target.href);
    }
});

// listen for user hitting back button
window.addEventListener('popstate', function(event){
    // get url params from browser search bar
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // load desired page
    getDesiredPage(urlParams);
});