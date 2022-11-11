// Open Sidebar
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("sidebarbtn").innerHTML = "";
}

// Close Sidebar
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    var elem = document.getElementById("sidebarbtn");
    elem.innerHTML = '<button class="openbtn" onclick="openNav()">&#9776</button>';
}

// Set the sidebar to initially be open if window is big enough
if (window.screen.width >= 700) {
    openNav();
}
else {
    closeNav();
}