# Converting a CSV file to an HTML Table

## Projects.csv
```
Name,Group,Date
Tilemap Backgrounds,Gameboy Development,15-Aug-22
Character Animation,Gameboy Development,15-Aug-22
Music/Audio Output,Gameboy Development,15-Aug-22
Test,Discord Bot,15-Aug-22
K-Means Clustering,Machine Learning,15-Aug-22
Something Here,Machine Learning,15-Aug-22
Arduino Oscilloscope,Machine Learning,15-Aug-22
```

## index.html
This code will generate a table from a CSV file
```html
<!-- Must Define the Table before running the script -->
<table id="CSVTable"></table>
<script src="../css_files/readcsv.js"></script>
```

## readcsv.js
Taken from
https://stackoverflow.com/questions/39989756/how-do-i-make-a-function-that-returns-the-value-of-a-local-text-file-in-javascri
```javascript
function readTextFile(file) {
    // get file data from an HTTP request and store it as "rawFile"
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
            // store the response in "allText"
            allText = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
}
```

## Reading the text files
```javascript
var allText; // define a place to store all the text
var file = readTextFile("../files/Projects.csv"); // read the csv file
var lines = allText.split("\n"); // split lines into an array
lines.pop(); // remove the empty line from the last element of the array
// console.log(allText) // view all of the text
// console.log(lines) // view the array
```

## From Array to HTML Table 
```javascript
// get the table from ElementById
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
console.log(newTable);

table.innerHTML = newTable; // change the HTML element
```

