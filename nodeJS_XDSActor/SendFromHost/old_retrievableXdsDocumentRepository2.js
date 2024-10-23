var hrstart = null;
var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;

var docNum = process.argv[2];

var HOST = require('./ip.js');
 PORT = require('./port.js');
var repoHost = 'localhost';
var repoPort = '9876';
var chunkSize = 1024;
var repoServer = null;
var repoSocket = null;
var xmlMessage = null;
var xmlChunks = [];

function simpleRegister() {
	console.log('Running simple document register mode...');
	var client = new net.Socket();
	//Send number of chunk to let the receiver know
	var prepareSendChunk = function () {
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
	var sendNextChunk = function () {
		if (j < xmlChunks.length) {
			client.write(xmlChunks[j], function () {
				j++;
			});
		}
	};

	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		var docChosen = 'SingleDocumentEntry' + docNum + '.xml';
		fs.readFile(docChosen, function (err, buf) {
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

	client.on('data', function (data) {
		var dataGot = data.toString();
		if (dataGot == "ACK") {
			sendNextChunk();
		}
		else if (dataGot == "FIN") {
			client.end();
			var hrend = process.hrtime(hrstart);
			console.log('==============================');
			console.log('Respond received: ' + data);
			var totalMillisec = hrend[0] * 1000 + (hrend[1] / 1000000);
			console.info('Execution time (hr): %dms', totalMillisec);
			console.log('==============================');
		}
		else {

		}
	});

	client.on('end', function () {
		console.log('Connection ended');
	});

	client.on('close', function () {
		console.log('Connection closed');
	});
}

var repoClient = {}; //This probably unstable, no instance to preserve separated connection between clients
function retrieveMode() {
	console.log('Running document retrievable mode...');

	//Expected to be new communication channel to replace net.Socket above
	var clientIP = {};
	repoServer = net.createServer(function (sock) {
		repoSocket = sock;
		console.log('CONNECTED: ' + repoSocket.remoteAddress + ':' + repoSocket.remotePort);
		clientIP[repoSocket.remoteAddress] = { //Add sub-component for packet handling, bound to each client
			receiveCounter: 0,
			messageChunks: 2,
			messageArray: [],
			xmlMessage: null,
			xmlChunks: [],
			i: 0
		};

		//Upon detected incoming data
		repoSocket.on('data', function (data) {
			console.log('Received packet....');
			//hrstart = process.hrtime();
			if (clientIP[repoSocket.remoteAddress].receiveCounter == 0) {
				if (data == "ACK") {
					console.log('ACK from ' + repoSocket.remoteAddress);
					repoSendNextChunk();
				}
				else if (data == "FIN") {
					console.log('FIN from ' + repoSocket.remoteAddress);
					delete clientIP[repoSocket.remoteAddress];
				}
				else if (data == "trigger local ITI-42") { //This is just for testing
					docNum = '11';
					simpleRegister();
					repoSocket.write('Register Success');
				}
				else {
					clientIP[repoSocket.remoteAddress].messageChunks = data;
					console.log("Total Chunk = " + clientIP[repoSocket.remoteAddress].messageChunks);
					clientIP[repoSocket.remoteAddress].receiveCounter++;
					console.log(clientIP[repoSocket.remoteAddress].receiveCounter);
					repoSocket.write("ACK");
				}
			}
			else {
				clientIP[repoSocket.remoteAddress].messageArray.push(data);
				clientIP[repoSocket.remoteAddress].receiveCounter++;
				console.log(clientIP[repoSocket.remoteAddress].receiveCounter);
				if (clientIP[repoSocket.remoteAddress].receiveCounter == clientIP[repoSocket.remoteAddress].messageChunks) {
					// All packets have been received, combine the packets into original message
					repoSocket.write("FIN");
					var originalMessage = Buffer.concat(clientIP[repoSocket.remoteAddress].messageArray).toString();
					console.log("All packets received!");
					processRetrieveMessage(originalMessage, repoSocket.remoteAddress, repoSocket.remotePort); //converting XML to JSON based on Module "xml-js"
					repoClient = repoSocket;
					//console.log(result); // show the result of xml to js conversion
					// reset the clientIP[repoSocket.remoteAddress].messageArray and clientIP[repoSocket.remoteAddress].receiveCounter
					clientIP[repoSocket.remoteAddress].messageArray = [];
					clientIP[repoSocket.remoteAddress].receiveCounter = 0;
				}
				else {
					repoSocket.write("ACK");
				}
			}
		});

		repoSocket.on('close', function (data) {
			console.log('CLOSED: ' + repoSocket.remoteAddress + ' ' + repoSocket.remotePort);
		});

		repoSocket.on('end', function () {
			console.log('Connection ended');
		})
	}).listen(repoPort, repoHost);
}

//Next step after recieved full message
var repoXmlChunks = [];
var repoXmlMessage = null;
function processRetrieveMessage(originalMessage, consumerHost, consumerPort) {
	//The program suppose to have received ITI-43 XML transaction here
	console.log('Process ITI-43 Request...');
	console.log('===================================================');
	console.log(originalMessage);
	console.log('===================================================');
	//Then process the ITI-43 Transaction
	//Then return the correct IHE Document corresponding to the request in ITI-43
	//For this version, we skip ITI-43 request processing. Assumed that ITI-43 request should already be processed, proceed to send back ITI-43 response
	var chosenResponse = 'ITI43responseSample.xml';
	//In real situation, the real process algorthm must be placed here!!!!!
	fs.readFile(chosenResponse, function (err, buf) {
		if (err) console.log(err);
		repoXmlMessage = buf.toString();

		repoXmlChunks = [];
		var chunk = "";
		for (var i = 0; i < repoXmlMessage.length; i++) {
			chunk += repoXmlMessage[i];
			if (chunk.length === chunkSize || i === repoXmlMessage.length - 1) {
				repoXmlChunks.push(chunk);
				chunk = "";
			}
		}

		repoPrepareSendChunk();
	});
}

function repoPrepareSendChunk() {
	var chunkCount = repoXmlChunks.length + 1; //+1 also count the chunkCount value
	console.log("***************************");
	console.log("Chunk pieces: " + chunkCount);
	console.log("***************************");
	if (chunkCount) {
		console.log("sending chunkCount");
		repoClient.write(chunkCount.toString()); //.write send only string
	}
	console.log('Sent: \n' + repoXmlMessage + '\n');     
}

var l = 0;
var repoSendNextChunk = function() {
	if (l < repoXmlChunks.length) {
		repoClient.write(repoXmlChunks[l], function() {
			l++;
		});
	}
};

//Main =======================================
if (docNum && docNum != '-r') {
	simpleRegister();
}
else if (docNum && docNum == '-r') {
	retrieveMode();
}
else {
	console.log('Input argument not found... exit');
}