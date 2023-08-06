var hrstart = null;
var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;

const docNum = process.argv[2];

var chunkSize = 1024;
var chunkSize = 1024;
var client = {};
var serverIP = {};

var endMarker = 0;
var sockEndMarker = 0;
var sockCloseMarker = 0;

//Send number of chunk to let the receiver know
var prepareSendChunk = function(HOST) {
    var chunkCount = serverIP[HOST].xmlChunks.length + 1; //+1 also count the chunkCount value
    console.log("***************************");
    console.log("Chunk pieces: " + chunkCount);
    console.log("***************************");
    if (chunkCount) {
        console.log("sending chunkCount");
        client[HOST].write(chunkCount.toString()); //.write send only string
    }
    hrstart = process.hrtime();
    console.log('Sent: \n' + serverIP[HOST].xmlMessage + '\n');     
}

// Send packets one by one
var sendNextChunk = function(HOST) {
    if (serverIP[client[HOST].remoteAddress].j < serverIP[client[HOST].remoteAddress].xmlChunks.length) {
        client[HOST].write(serverIP[client[HOST].remoteAddress].xmlChunks[serverIP[client[HOST].remoteAddress].j], function() {
            serverIP[client[HOST].remoteAddress].j++;
        });
    }
};

function docRegistBroadcast (ip){
    var HOST = "192.168.1.10" + ip;
    var PORT = 65510 + parseInt(ip);
    client[HOST] = new net.Socket();
    serverIP[HOST] = {
        xmlMessage: null,
        xmlChunks: [],
        j: 0
    };
    client[HOST].connect(PORT, HOST, function() {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        var docChosen = 'SingleDocumentEntry' + docNum + '.xml';
        fs.readFile(docChosen, function(err, buf) {
            if (err) console.log(err);
            serverIP[HOST].xmlMessage = buf.toString();

            // Split XML message into smaller packets
            serverIP[HOST].xmlChunks = [];
            var chunk = "";
            for (var i = 0; i < serverIP[HOST].xmlMessage.length; i++) {
                chunk += serverIP[HOST].xmlMessage[i];
                if (chunk.length === chunkSize || i === serverIP[HOST].xmlMessage.length - 1) {
                    serverIP[HOST].xmlChunks.push(chunk);
                    chunk = "";
                }
            }
            prepareSendChunk(HOST);
        });
    });

    client[HOST].on('data', function(data) {
        var dataGot = data.toString();
        if (dataGot == "ACK") {
            sendNextChunk(HOST);
        }
        else if (dataGot == "FIN") {
            endMarker++;
            var hrend = process.hrtime(hrstart);
            console.log('==============================');
            console.log('Respond received: ' + data);
            var totalMillisec = hrend[0]*1000 + (hrend[1] / 1000000);
            console.info('Execution time (hr): %dms', totalMillisec);
            console.log('==============================');
        }

        if (endMarker == 8) {
            console.log('All output sent!');
            for (var i = 0; i < 8; i++) {
                var closeHOST = '192.168.1.10' + i.toString();
                client[closeHOST].end();
            }
        }
    });

    client[HOST].on('end', function() {
        sockEndMarker++;
        if (sockEndMarker == 8) {
            console.log('All Connection ended');
        }
    });

    client[HOST].on('close', function() {
        sockCloseMarker++;
        if (sockCloseMarker == 8) {
            console.log('All Connection closed');
        }
    });
}

docRegistBroadcast('0');
docRegistBroadcast('1');
docRegistBroadcast('2');
docRegistBroadcast('3');
docRegistBroadcast('4');
docRegistBroadcast('5');
docRegistBroadcast('6');
docRegistBroadcast('7');