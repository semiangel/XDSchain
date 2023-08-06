var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
//var HOST = '192.168.176.128';
//var PORT = 8080;
var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    var text = 
    "<bookstore>" + 
		"<book>" +
			"<title>Everyday Italian</title>" +
			"<author>Giada De Laurentiis</author>" +
			"<year>2005</year>" +
		"</book>" + 
	"</bookstore>";
    client.write(text);
    console.log('Sent: \n' + text + '\n');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('Respond received: ' + data);
    // Close the client socket completely
    client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});