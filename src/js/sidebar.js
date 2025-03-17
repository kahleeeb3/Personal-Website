function openSidebar() {
    if (window.innerWidth > 990) {
        document.getElementById("content").style.marginLeft = "250px";
    }
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("openSidebarButton").style.display = "none"; 
}

function closeSidebar() {
    document.getElementById("content").style.marginLeft = "0px";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("openSidebarButton").style.display = "block"; 
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 990) {
        closeSidebar();
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