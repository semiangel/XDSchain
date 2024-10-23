var hrstart = null;
var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;
const os = require('os');

const argumentInput = process.argv.slice(2);

//static assigned Document Registry IP to HOST and PORT, this would be use for ITI-42 and logging publish
var HOST = require('./ip.js'); 
var PORT = require('./port.js');
//var repoHost = 'localhost'; //Change static assigned repository IP to dynamic 
var repoPort = '4321';
var chunkSize = 1024;
var repoServer = null;
var repoSocket = null;
var xmlMessage = null;
var xmlChunks = [];
var docNum = null;
//variable  for experment=====
const sampleNumber = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
var roundCountCheck = 0;
console.log('Total Round: '+ roundCountCheck);

//pause function for general use
function pause(duration) {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
}

//Get local IP number for log
function getLocalIPAddress() {
    const networkInterfaces = os.networkInterfaces();

    for (const interface of Object.values(networkInterfaces)) {
        for (const config of interface) {
            // Check if the IP is a local IPv4 address (not internal like 127.0.0.1)
            if (config.family === 'IPv4' && !config.internal &&
                (config.address.startsWith('192.168') || config.address.startsWith('10.'))) {
                return config.address;
            }
        }
    }

    // Return null if no local IP is found (you could also choose to return a default value)
    return null;
}

const thisMachineIP = getLocalIPAddress();
const repoHost = thisMachineIP; //assign repository IP for TCP connection

//ITI-42
function simpleRegister() {
	roundCountCheck++;
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
		console.log('Sent ITI-42...');
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
			console.log('Else, no handling method');
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
					docNum = '12';
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
	parseString(originalMessage, function (err, result) {
		if (err) throw err;
		console.log('\nConverted to object: ');
		console.log('-----------------------\n' + util.inspect(result) + '\n---------------------');

		console.log(util.inspect(result['soapenv:Envelope']['soapenv:Body'][0]['xsdb:RetrieveDocumentSetRequest'][0]['xsdb:DocumentRequest']));
		const documentRequestInfo = result['soapenv:Envelope']['soapenv:Body'][0]['xsdb:RetrieveDocumentSetRequest'][0]['xsdb:DocumentRequest'];
		var homeCommunityId = null;
		var repositoryUniqueId = null;
		var documentUniqueId = null;
		if (documentRequestInfo['xsdb:HomeCommunityId'][0]) {
			homeCommunityId = documentRequestInfo['xsdb:HomeCommunityId'][0];
			console.log('homeCommunityId = ' + homeCommunityId);
		}
		if (documentRequestInfo['xsdb:RepositoryUniqueId'][0]) {
			repositoryUniqueId = documentRequestInfo['xsdb:RepositoryUniqueId'][0];
			console.log('repositoryUniqueId = ' + repositoryUniqueId);
		}
		if (documentRequestInfo['xsdb:DocumentUniqueId'][0]) {
			documentUniqueId = documentRequestInfo['xsdb:DocumentUniqueId'][0];
			console.log('documentUniqueId = ' + documentUniqueId);
		}
	});
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
		logRetrieve(consumerHost, documentUniqueId);
	});
}

var logChunks = [];
var logMessage = null;
var logClient = {};
function logRetrieve (fromIPAddr, documentUniqueId) {
	console.log('Log Retrieval...');
	console.log('Document Unique ID: ' + documentUniqueId);
	roundCountCheck++;
	logClient = new net.Socket();
	var timeStamp = new Date().toString();
	logMessage = "Retrieval Log | " + "from Document Consumer: " + fromIPAddr + " | " + "to Document Repository" + thisMachineIP + " | " + "Document ID: " + documentUniqueId + " | " + timeStamp;

	//Still bug here! 3-3-2024 06.00 PM
	logClient.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);

		// Split XML message into smaller packets
		logChunks = [];
		var chunk = "";
		for (var i = 0; i < logMessage.length; i++) {
			chunk += logMessage[i];
			if (chunk.length === chunkSize || i === logMessage.length - 1) {
				logChunks.push(chunk);
				chunk = "";
			}
		}
		logPrepareSendChunk(); //Prepare and enter packets sending loop
	});

	logClient.on('data', function (data) {
		var dataGot = data.toString();
		if (dataGot == "ACK") {
			logSendNextChunk();
		}
		else if (dataGot == "FIN") {
			logClient.end();
			var hrend = process.hrtime(hrstart);
			console.log('==============================');
			console.log('Respond received: ' + data);
			var totalMillisec = hrend[0] * 1000 + (hrend[1] / 1000000);
			console.info('Execution time (hr): %dms', totalMillisec);
			timeRecord(totalMillisec + ',');
			console.log('==============================');
		}
		else {
			console.log('Else, no handling method');
		}
	});

	logClient.on('end', function () {
		console.log('Connection ended');
	});

	logClient.on('close', function () {
		console.log('Connection closed');
	});
}

//Prepare packet chunks for retrieve from Repository function====================================
function repoPrepareSendChunk() {
	var chunkCount = repoXmlChunks.length + 1; //+1 also count the chunkCount value
	console.log("***************************");
	console.log("Chunk pieces: " + chunkCount);
	console.log("***************************");
	if (chunkCount) {
		console.log("sending chunkCount");
		repoClient.write(chunkCount.toString()); //.write send only string
	}
	console.log('Sent repoXmlMessage...');     
}

var l = 0;
var repoSendNextChunk = function() {
	if (l < repoXmlChunks.length) {
		repoClient.write(repoXmlChunks[l], function() {
			l++;
		});
	}
};

//Prepare packet chunks for logging on repository side===============================
function logPrepareSendChunk() {
	var chunkCount = logChunks.length + 1; //+1 also count the chunkCount value
	console.log("***************************");
	console.log("Chunk pieces: " + chunkCount);
	console.log("***************************");
	if (chunkCount) {
		console.log("sending chunkCount: " + chunkCount);
		m = 0; //reset counter for logSendNextChunk
		logClient.write(chunkCount.toString()); //.write send only string
	}
	hrstart = process.hrtime();
	console.log('Sent Log Message');     
}

var m;
var logSendNextChunk = function() {
	if (m < logChunks.length) {
		logClient.write(logChunks[m], function() {
			m++;
		});
	}
};

function timeRecord(timeRec) {
    fs.writeFile('expTimeRecordLogview.txt', String(timeRec), (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('File written successfully');
			console.log('Total round: ' + roundCountCheck);
        }
    });
}

//Main =======================================
//variables for experiment
var repeatTimes = null;
var nextRound = null;
var retrieveRepeat = null;
//============================================
const fixedIPAddr = ['none', '192.168.1.100', '192.168.1.101', '192.168.1.102', '192.168.1.103', '192.168.1.104', '192.168.1.105', '192.168.1.106', '192.168.1.107', '192.168.1.108', '192.168.1.109'];
const docUniqueId = ['none', 'experimentUniqueId01-780d23a4dd7b5514289a32b38bc6c167',
	'experimentUniqueId02-b27d9f1d8c2a2a3d11ee0269e4f9bb72',
	'experimentUniqueId03-19503cce414173e8a27060de24a5ec0e',
	'experimentUniqueId04-6206fea3cbcfe50c1fb0eb3da2e1b63b',
	'experimentUniqueId05-4e48537b89aaa1179f07f2abd9068cad',
	'experimentUniqueId06-ee7a37707e98dccbb511fc57e2132ba7',
	'experimentUniqueId07-403ba00121f30929ace67d9bdb45d21c',
	'experimentUniqueId08-14dd9ef9a2233f1c90571c4d131512c3',
	'experimentUniqueId09-0d3dc803d30c149f56830e6dcc2bdf36',
	'experimentUniqueId10-7cab01cc7688efc8c7b400fbb6ee6ec1',
	'experimentUniqueId11-9af5f3badb2594250bc3378f2ff7e6f1',
	'experimentUniqueId12-e38975e5c52c649509df3f02ff4963ee'];
//============================================

docNum = argumentInput[0];
if (argumentInput.length > 1) {
	if (!isNaN(docNum) && !isNaN(argumentInput[1]) && !isNaN(argumentInput[2])) {
		//node logAndRetrievableXdsDocumentRepository 01 10 10
		repeatTimes = argumentInput[1];
		nextRound = argumentInput[2];
		console.log('Repeat process until document number: ' + repeatTimes);
		console.log('Start with document number: ' + docNum);
		simpleRegister();
	}
	else {
		if (argumentInput[1] == '-r') {
			//node logAndRetrievableXdsDocumentRepository 01 -r 10 10
			retrieveRepeat = argumentInput[2];
			nextRound = argumentInput[3];
			var intDocNum = parseInt(docNum);
			logRetrieve(fixedIPAddr[intDocNum], docUniqueId[intDocNum]);
		}
		else {
			console.log(argumentInput);
			console.log('Nologic to handle this... crash');
			process.exit();
		}
	}
}
else {
	if (docNum != '-r') {
		simpleRegister();
	}
	else {
		retrieveMode();
	}
}

//==================================================================================
//Repeat process, only for experiment
//==================================================================================
//var roundCountCheck = 0; moved this to top
if (repeatTimes) {
	console.log('Register is active...');
	const nextPort = 5656;
	var expServer = net.createServer((socket) => {

		socket.on('data', function (data) {
			var dataGot = data.toString();
			console.log('Received from client:', dataGot);
			if (dataGot == 'Ready') {
				pause(3000);
				repeatTimes--;
				console.log('Repeat remaining on current batch: ' + repeatTimes);
				console.log('Total round: ' + roundCountCheck);
				if (repeatTimes > 0) {
					console.log('Continue repeat...');
					docNum = sampleNumber[11 - repeatTimes];
					console.log('Proceed on document number: ' + docNum);
					simpleRegister();
				}
				else {
					console.log('Reached current round repeat at: ' + repeatTimes);
					nextRound--;
					if (nextRound > 0) {
						console.log('Begin new round...');
						repeatTimes = 10;
						console.log('Continue repeat at: ' + repeatTimes);
						docNum = sampleNumber[11 - repeatTimes];
						console.log('Proceed on document number: ' + docNum);
						simpleRegister();
					}
					else {
						console.log('Reached the end of iteration at: ' + nextRound);
						console.log('Total round: ' + roundCountCheck);
						console.log('Terminate...');
						process.exit();
					}
				}
			}
		});

		socket.on('end', function () {
			//console.log('Connection ended');
			console.log('CE');
		});

		socket.on('close', function () {
			//console.log('Connection closed');
			console.log('CC');
		});

	});

	expServer.listen(nextPort, '0.0.0.0', () => {
		console.log('Listening for -next- on port ' + nextPort);
	});
}

//This one is a little...tricky, log directly generated. 
//This because Retrieval process only done by the host machine for proof of concept,-
//it mean host machine act as both Consumer and Repository, so it practically interact with itself.
//It simpler to generate retrieval directly from this method (only for experiment)
if (retrieveRepeat) {
	console.log('Retrieve is active...');
	const nextPort = 5858;
	var expServer = net.createServer((socket) => {

		socket.on('data', function (data) {
			var dataGot = data.toString();
			console.log('Received from client:', dataGot);
			if (dataGot == 'Ready') {
				pause(3000);
				retrieveRepeat--;
				console.log('Repeat remaining on current batch: ' + retrieveRepeat);
				if (retrieveRepeat > 0) {
					console.log('Continue repeat...');
					docNum = parseInt(sampleNumber[11 - retrieveRepeat]);
					console.log('Proceed on document number: ' + docNum);
					logRetrieve(fixedIPAddr[docNum], docUniqueId[docNum]);
				}
				else {
					console.log('Reached current round repeat at: ' + retrieveRepeat);
					nextRound--;
					if (nextRound > 0) {
						console.log('Begin new round...');
						retrieveRepeat = 10;
						console.log('Continue repeat at: ' + retrieveRepeat);
						docNum = parseInt(sampleNumber[11 - retrieveRepeat]);
						console.log('Proceed on document number: ' + docNum);
						logRetrieve(fixedIPAddr[docNum], docUniqueId[docNum]);
					}
					else {
						console.log('Reached the end of iteration at: ' + nextRound);
						console.log('Total round: ' + roundCountCheck);
						console.log('Terminate...');
						process.exit();
					}
				}
			}
		});

		socket.on('end', function () {
			//console.log('Connection ended');
			console.log('CE');
		});

		socket.on('close', function () {
			//console.log('Connection closed');
			console.log('CC');
		});

	});

	expServer.listen(nextPort, '0.0.0.0', () => {
		console.log('Listening for -next- on port ' + nextPort);
	});
}

//==================================================================================