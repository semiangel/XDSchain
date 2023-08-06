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
var chunkSize = 1024;
var client = new net.Socket();

client.connect(PORT, HOST, function() {
    rl.question("Choose documents: ", function(docNum) {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        var docChosen = 'SingleDocumentEntry' + docNum + '.xml';
        fs.readFile(docChosen, function(err, buf) {
            if (err) console.log(err);
            var xmlMessage = buf.toString();

            // Split XML message into smaller packets
            var xmlChunks = [];
            var chunk = "";
            for (var i = 0; i < xmlMessage.length; i++) {
                chunk += xmlMessage[i];
                if (chunk.length === chunkSize || i === xmlMessage.length - 1) {
                    xmlChunks.push(chunk);
                    chunk = "";
                }
            }

            // Send packets one by one
            var i = 0;
            var sendNextChunk = function() {
                if (i < xmlChunks.length) {
                    client.write(xmlChunks[i], function() {
                        i++;
                        sendNextChunk();
                    });
                } else {
                    client.end();
                }
            };

            hrstart = process.hrtime();
            console.log('Sent: \n' + xmlMessage + '\n');
            sendNextChunk();
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
});

client.on('end', function() {
    console.log('Connection ended');
});

client.on('close', function() {
    console.log('Connection closed');
});

