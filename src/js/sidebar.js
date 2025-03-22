const mobileScreenWidth = 700; // size to determine if on mobile device
var userOnMobile = false; // keeps track if the user is on mobile

function openSidebar() {
    // disable the openSidebar div
    document.getElementById("openSidebar").style.display = "none";

    // enable sidebar
    document.getElementById("sidebar").style.display = "block";

    // set grid to be 2x1
    if(userOnMobile){
        document.body.style.gridTemplateColumns = '1fr 0px';
    }
    else{
        document.body.style.gridTemplateColumns = '250px 1fr';
    }
    document.body.style.gridTemplateRows = '1fr';
}


function closeSidebar() {
    // disable sidebar
    document.getElementById("sidebar").style.display = "none";

    // enable the openSidebar div
    document.getElementById("openSidebar").style.display = "block";

    // set grid to be 1x2
    document.body.style.gridTemplateColumns = '1fr';
    document.body.style.gridTemplateRows = 'auto 1fr';
}

document.addEventListener("DOMContentLoaded", function () {
    if(window.innerWidth < mobileScreenWidth){
        userOnMobile = true;
        closeSidebar();
    }
});

window.addEventListener("resize", () => {
    if(window.innerWidth < mobileScreenWidth){
        userOnMobile = true;
        closeSidebar();
    }
    else{
        userOnMobile = false;
        openSidebar();
    }
});