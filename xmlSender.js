var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
//var HOST = '192.168.176.128';
//var PORT = 8080;
var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    /*
    var text = 
    "<rim:bookstore>" + 
		"<rim:book>" +
			"<title>Everyday Italian</title>" +
			"<author>Giada De Laurentiis</author>" +
			"<year>2005</year>" +
		"</rim:book>" + 
	"</rim:bookstore>";
    */
    
    var text = 
    //'this is not xml' +
    '<rim:Slot name="authorPerson">' +
        '<rim:ValueList>' +
            '<rim:Value>Gerald Smitty</rim:Value>' +
        '</rim:ValueList>' +
    '</rim:Slot>' +
    '<rim:Slot name="authorInstitution">' +
        '<rim:ValueList>' +
            '<rim:Value>Cleveland Clinic</rim:Value>' +
            '<rim:Value>Parma Community</rim:Value>' +
        '</rim:ValueList>' +
    '</rim:Slot>' +
    '<rim:Slot name="authorRole">' +
        '<rim:ValueList>' +
            '<rim:Value>Attending</rim:Value>' +
        '</rim:ValueList>' +
    '</rim:Slot>';
    //note: when xml attached to some non-xml, it will result as 'undefined' object
    //note: so, we need to filter out all non-xml
    
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