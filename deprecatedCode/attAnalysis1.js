var fs = require("fs");
var convert = require('xml-js');
const util = require('util');
var i = 0;
var j = 0;

fs.readFile("SingleDocumentEntry.xml", function(err, buf) {
    var result = convert.xml2js(buf);
    var doc1 = result;
    //console.log(JSON.stringify(doc1));
    fs.writeFile("temp4.json", JSON.stringify(result), function(err, data) {
          if (err) console.log(err);
          console.log("Successfully Written to File. ");
    });    
});