/**
 * Controls the size of elements on mobile devices.
 * Specifically, this script targets all images with the id "figure" and sets their width to 100% when the window screen width is less than or equal to 700 pixels.
 *
 * This ensures that images take up the full width of the mobile device's screen, making them easier to view and interact with on smaller screens.
 *
 * By using this script, we aim to provide a better user experience for visitors who access our website on mobile devices.
 */


// if the screen is less than 700 pixels

if (window.screen.width <= 700) {
    // set all "figure" images to 100% width
    const figures = document.querySelectorAll("#figure");
    figures.forEach((figure) => {
        console.log("found image");
        figure.style.width = "100%";
    });

}
