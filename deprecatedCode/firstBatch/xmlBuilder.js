var fs = require("fs");
var xml2js = require('xml2js');
const util = require('util');
var format = require('xml-formatter');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;

fs.readFile("SingleDocumentEntry.xml", function(err, buf) {
    parseString(buf, function (err, result) {
        if (err) throw err;
        console.log('\nConverted to object... ');
        var resultXML = builder.buildObject(result);
        var regex = /\r?\n|\r/g;
        var resultXML = resultXML.replace(regex,'');
        var resultXML2 = format(resultXML);
        fs.writeFile("rebuiltXML.xml", resultXML, function(err, data) {
          if (err) console.log(err);
          console.log("Successfully Written to File. ");
        });
        console.log('-----------------------');
    });
});

