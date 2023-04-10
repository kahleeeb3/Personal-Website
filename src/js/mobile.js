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

    // Change the format of the education section
    const education = document.querySelectorAll("div#Education");
    education.forEach((div) =>{
        div.innerHTML = `
            <div id="Education">
                M.S. Computer Science and Software Engineering<br>
                Auburn University, Auburn, AL<br>
                Expected: May 2024<br>
                <br>
                B.A. Physics & Computational Mathematics<br>
                Wabash College, Crawfordsville, IN<br>
                May 2022
            </div>
            `;
        div.style = null; // erase style values
    });
    
    // set all "figure" images to 100% width
    const figures = document.querySelectorAll("img#figure");
    figures.forEach((figure) => {
        figure.style.width = "100%";
    });

    // make all table elements have smaller text
    const tables = document.querySelectorAll("table#CSVTable");
    tables.forEach((table) => {
        table.style.fontSize = "small";
    });

    // make all letx code width of 100%
    const latexCodes = document.querySelectorAll("img#latex-code");
    latexCodes.forEach((latexCode) => {
        latexCode.style.width = "100%";
    });


}
