
function openSidebar() {
    // disable the openSidebar div
    document.getElementById("openSidebar").style.display = "none";

    // enable sidebar
    document.getElementById("sidebar").style.display = "block";

    // set grid to be 2x1
    document.body.style.gridTemplateColumns = '250px 1fr';
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