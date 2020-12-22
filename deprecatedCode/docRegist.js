var net = require('net');
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

var HOST = '127.0.0.1';
var PORT = 6969;
//var HOST = '192.168.176.128';
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

        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('ACK from ' + sock.remoteAddress + '\n');

        parseString(data, function (err, result) {
            //if (err) throw err;
            console.log('\nConverted to object: ');
            console.log(result);

            var builder = new xml2js.Builder();
            var resp = builder.buildObject(result);
            console.log('\n' + resp);
        });
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);