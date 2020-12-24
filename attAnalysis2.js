var fs = require("fs");
var xml2js = require('xml2js');
const util = require('util');
var parseString = xml2js.parseString;
var i = 0;
var j = 0;

fs.readFile("SingleDocumentEntry.xml", function(err, buf) {
    //var doc1 = result;
    //console.log(JSON.stringify(doc1));  
    //console.log('XML:\n' + buf);  
    parseString(buf, function (err, result) {
        if (err) throw err;
        console.log('\nConverted to object: ');
        //console.log('-----------------------\n' + result + '\n---------------------');
        //console.log('-----------------------\n' + stringXDSAttrib + '\n---------------------');
        /*
        fs.writeFile("temp3.json", stringXDSAttrib, function(err, data) {
          if (err) console.log(err);
          console.log("Successfully Written to File. ");
        });
        */
        var kKeys = Object.keys(result['soapenv:Envelope']);
        console.log(kKeys);
        console.log('-----------------------');
        console.log(result['soapenv:Envelope']['$']);
        console.log('-----------------------');
        console.log(result['soapenv:Envelope']['soapenv:Body']);
        console.log('-----------------------');
        console.log(result['soapenv:Envelope']['soapenv:Header']);
        console.log('-----------------------');
    });
});