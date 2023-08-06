var hrstart = null;
var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;

const docNum = process.argv[2];

var HOST = require('./ip.js');
var PORT = require('./port.js');
var chunkSize = 1024;
var client = new net.Socket();
var xmlMessage = null;
var xmlChunks = [];

//Send number of chunk to let the receiver know
var prepareSendChunk = function() {
    var chunkCount = xmlChunks.length + 1; //+1 also count the chunkCount value
    console.log("***************************");
    console.log("Chunk pieces: " + chunkCount);
    console.log("***************************");
    if (chunkCount) {
        console.log("sending chunkCount");
        client.write(chunkCount.toString()); //.write send only string
    }
    hrstart = process.hrtime();
    console.log('Sent: \n' + xmlMessage + '\n');     
}

// Send packets one by one
var j = 0;
var sendNextChunk = function() {
    if (j < xmlChunks.length) {
        client.write(xmlChunks[j], function() {
            j++;
        });
    }
};

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    var docChosen = 'SingleDocumentEntry' + docNum + '.xml';
    fs.readFile(docChosen, function(err, buf) {
        if (err) console.log(err);
        xmlMessage = buf.toString();

        // Split XML message into smaller packets
        xmlChunks = [];
        var chunk = "";
        for (var i = 0; i < xmlMessage.length; i++) {
            chunk += xmlMessage[i];
            if (chunk.length === chunkSize || i === xmlMessage.length - 1) {
                xmlChunks.push(chunk);
                chunk = "";
            }
        }
        prepareSendChunk(); //Prepare and enter packets sending loop
    });
});

client.on('data', function(data) {
    var dataGot = data.toString();
    if (dataGot == "ACK") {
        sendNextChunk();
    }
    else if (dataGot == "FIN") {
        client.end();
        var hrend = process.hrtime(hrstart);
        console.log('==============================');
        console.log('Respond received: ' + data);
        var totalMillisec = hrend[0]*1000 + (hrend[1] / 1000000);
        console.info('Execution time (hr): %dms', totalMillisec);
        console.log('==============================');
    }
});

client.on('end', function() {
    console.log('Connection ended');
});

client.on('close', function() {
    console.log('Connection closed');
});