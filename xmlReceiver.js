var net = require('net');
var fs = require("fs");

//var xml2js = require('xml2js');
//var parseString = xml2js.parseString;

var convert = require('xml-js');

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
        
        console.log('DATA ' + sock.remoteAddress + ': \n' + data);
        fs.writeFile("temp.xml", data, function(err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });

        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('ACK from ' + sock.remoteAddress + '\n');

//-----------------------------------------------------------------xml-js
        //var result = convert.xml2js(data);
        //console.log(result);

//-----------------------------------------------------------------xml2js
/*
        parseString(data, function (err, result) {
            //if (err) throw err;
            console.log('\nConverted to object: ');
            console.log(result);

            //var builder = new xml2js.Builder();
            //var resp = builder.buildObject(result);
            //console.log('\n' + resp);
        });
*/
//-----------------------------------------------------------------
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);