var hrstart = null;
var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Write: ", function(writingInput) {
	var writingText = '';
	if (writingInput != '01'){
		writingText = '\n';
	}
	writingText = writingText + '==========' + writingInput;
    for (i = 1; i < 8; i++){
	    var chosenDoc = 'resultN0' + i + '.txt';
	    fs.writeFile(chosenDoc, writingText, {flag: "a"}, function(err) {
	            if (err) console.log(err);
	            console.log("Successfully Written to File.");
	        });
	    rl.close();
	}
});
