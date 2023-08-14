var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;
var hrstart = null;

var savedMetaAtt = 'ITI43sample.xml';
var savedJSON = 'ITI43sample.json';
fs.readFile(savedMetaAtt, function(err, buf) {
    if (err) console.log(err);
    repoXmlMessage = buf.toString();

    parseString(repoXmlMessage, function (err, result) {
        if (err) throw err;
        console.log('\nConverted to object: ');
        console.log('-----------------------\n' + util.inspect(result) + '\n---------------------');

        var writingJSON = JSON.stringify(result, null, 2);
        fs.writeFile(savedJSON, writingJSON, {flag: "w"}, function(err) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
        //RetrieveDocumentSet(result);
    });

});