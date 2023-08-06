var fs = require("fs");
var net = require('net');
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var moment = require('moment');

var Web3 =  require('web3');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

var HOST = '127.0.0.1';
var PORT = 65519;
var netServer = null;
var netSocket = null;

function echoSomething (dataIn) {
	if (netServer && netSocket) {
		console.log('Echoing something...');
		netSocket.write('Something echoed...');
	}
}

netServer = net.createServer(function(sock) {

	netSocket = sock;
      
  	// We have a connection - a socket object is assigned to the connection automatically
  	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
      
  	// Add a 'data' event handler to this instance of socket
  	sock.on('data', function(data) {
      	console.log('Received data....');
      	sock.write('ACK from ' + sock.remoteAddress + '\n'); //Write ACK back to sender
      	echoSomething(data); //converting XML to JSON based on Module "xml-js"
      	//console.log(result); // show the result of xml to js conversion              
  	});
      
  	// Add a 'close' event handler to this instance of socket
  	sock.on('close', function(data) {
      	console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
  	});
      
}).listen(PORT, HOST);

console.log('XDS Document Registry Actor listening on ' + HOST +':'+ PORT);