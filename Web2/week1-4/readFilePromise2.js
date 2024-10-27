const fs = require("fs");

function cleanFile(filePath) {
    return new Promise(function(resolve) {
        fs.readFile(filePath, "utf-8", function (err, data) {
            data = data.trim();
            fs.writeFile(filePath, data, function () {
              resolve();
            })
        })
    } )
}

function onDone() {
    console.log("File cleaned");
}
 
// async function main() {
 cleanFile("a.txt").then(onDone);
// console.log("Cleaned...."); }


// main();


