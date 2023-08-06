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

var HOST = require('./ip.js');
var PORT = 65519;
var client = new net.Socket();

client.connect(PORT, HOST, function() {
    rl.question("Choose documents: ", function(docNum) {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        var docChosen = 'SingleDocumentEntry' + docNum + '.xml';
        fs.readFile(docChosen, function(err, buf) {
            if (err) console.log(err);
            var text = buf.toString();
            client.write(text);
            hrstart = process.hrtime();
            console.log('Sent: \n' + text + '\n');
        });
        rl.close();
    });
});

client.on('data', function(data) {

    var hrend = process.hrtime(hrstart);
    console.log('==============================');
    console.log('Respond received: ' + data);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    console.log('==============================');
    client.destroy();
});

client.on('close', function() {
    console.log('Connection closed');
});