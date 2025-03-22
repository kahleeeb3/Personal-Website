function closeSidebar(){
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    const button = document.getElementById("openSidebarButton");

    button.style.backgroundColor = ""; 
    content.style.marginLeft = "0px";
    sidebar.style.display = "none";

    sidebar.classList.remove("expanded");
}

function openSidebar(){
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    const button = document.getElementById("openSidebarButton");
    
    button.style.backgroundColor = "rgb(15, 15, 15)"; 

    if (window.innerWidth > 990) {
        content.style.marginLeft = "250px";
    }
    sidebar.style.display = "block";

    sidebar.classList.add("expanded");
}

function toggleSidebar(){
    const sidebar = document.getElementById("sidebar");

    if(sidebar.classList.contains("expanded")){
        closeSidebar();
    }
    else{
        openSidebar();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 990) {
        closeSidebar();
    }
    else{
        openSidebar();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 990) {
        closeSidebar();
    }
    else {
        openSidebar();
    }
});