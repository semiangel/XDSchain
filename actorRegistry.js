var net = require('net');
var fs = require("fs");
var convert = require('xml-js');
const util = require('util');


var HOST = '127.0.0.1';
var PORT = 6969;
//var HOST = '192.168.61.1';
//var PORT = 8080;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('Received from Document Repository: ' + sock.remoteAddress);

        // Write the data back to the socket, the client will receive it as data from the server

        fs.readFile("RegisterDocumentSet-bResponse.xml", function(err, buf) {
            var text = buf.toString();
            sock.write(text);
            console.log('Responsed to Document Repository actor');
        });

        var result = convert.xml2js(data);
        //console.log(result);
        console.log(util.inspect(result, {depth: null}));
        //var stringResult = result.toString();

        fs.writeFile("objReceived.xml", util.inspect(result, {depth: null}), function(err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });   

        console.log('------------------------------');

        var documentID = {
            creationTime: result.elements[0].elements[0].elements[0].elements[0].elements[0].elements[0].elements[0].text,
            languageCode: 0,
            serviceStartTime: 0,
            serviceStopTime: 0,
            sourcePatientId: 0,
            sourcePatientInfo: 0
        }
        
        console.log(documentID.creationTime);
        console.log('------------------------------');

    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);