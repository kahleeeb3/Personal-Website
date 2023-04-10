function csvTable(file, id) {
  const lines = textFileAsArray(file);
  // get the table
  var table = document.getElementById(id);
  var newTable = '<table id="' + id + '">\n';
  // for each line in the csv
  for (let i = 0; i < lines.length; i++) {
    newTable = newTable.concat("<tr>\n");
    // for each comma sep value in the line
    lines[i].split(",").forEach((value) => {
      // if we are at the head of the table
      if (i == 0) {
        newTable = newTable.concat("<th>" + value + "</th>\n");
      }
      else if (value[0] == "?") {
        // console.log(value);
        newTable = newTable.concat('<td><a href="' + value + '"> Link </a> </td>\n');
      }
      else {
        newTable = newTable.concat("<td>" + value + "</td>\n");
      }
    });
    newTable = newTable.concat("</tr>\n");
  }
  newTable = newTable.concat("</table>\n");
  // console.log(newTable);
  table.innerHTML = newTable;
}

function textFileAsArray(file) {
  var allText = readTextFile(file);
  var lines = allText.split("\n");
  lines.pop();
  return lines;
}

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  var allText; // define where to store the data
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return allText;
}

function replaceHTML(element, file) {
  var HTMLElement = document.getElementById(element);
  var body = readTextFile(file);
  HTMLElement.innerHTML = body;
}

function get_page() {
  // get the page you would like to load from the url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get('page');

  // check if a page was passed
  if (page !== null && page.trim() !== '') {
    replaceHTML("main", `${page}.html`); // insert main text
  } else {
    replaceHTML("main", "home.html"); // insert main text
  }

  // add the csv table to projects
  if(page === "projects/projects"){
    csvTable("/files/Projects.csv", "CSVTable");
  }
}