//Simple program that read .xml file and send it via TCP socket

var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

var HOST = '127.0.0.1';
var PORT = 65519;
//var HOST = '192.168.176.128';
//var PORT = 8080;
var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    fs.readFile("RegistryStoredQueryRequest.xml", function(err, buf) {
        if (err) console.log(err);
        var text = buf.toString();
        client.write(text);
        console.log('Sent: \n' + text + '\n');
    });
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    // Close the client socket completely
    if (data.includes('ACK from ')){
        console.log('Respond received: ' + data);
    }
    else {
        console.log('==============================\nQuery response received: \n\n' + data + '\n==============================');
        //dataIn = JSON.parse(data);
        client.destroy();
    }
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

//Successfully read and send SingleDocumentEntry.xml
//Now, choice is 1.found a way to remove invalid XML syntax 2.Sent it straight forward from xmlReadthenSend.js