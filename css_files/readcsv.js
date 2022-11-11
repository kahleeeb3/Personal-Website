console.log("testing..");
var file = readTextFile("../files/Projects.csv");
var allText;
// var reader = new FileReader();
var lines = allText.split("\n");
lines.pop();

// console.log(allText)
console.log(lines)

// get the table
var table = document.getElementById("CSVTable");
var newTable = '<table id="CSVTable">\n';

// for each line in the csv
for (let i = 0; i < lines.length; i++) {
  newTable = newTable.concat("<tr>\n");
  // for each comma sep value in the line
  lines[i].split(",").forEach((value) => {
    // if we are at the head of the table
    if (i == 0) {
      newTable = newTable.concat("<th>" + value + "</th>\n");
    } else {
      newTable = newTable.concat("<td>" + value + "</td>\n");
    }
  });
  newTable = newTable.concat("</tr>\n");
}
newTable = newTable.concat("</table>\n");
// console.log(newTable);

table.innerHTML = newTable;

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
        //alert(allText);
      }
    }
  };
  rawFile.send(null);
}
