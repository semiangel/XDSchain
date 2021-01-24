//Simple program that read .xml file and send it via TCP socket

var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var HOST = '127.0.0.1';
var PORT = 65519;
//var HOST = '192.168.176.128';
//var PORT = 8080;
var client = new net.Socket();
var queryXML = {
  "query:AdhocQueryRequest": {
    "$": {
      "xmlns:query": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0",
      "xmlns:rim": "urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0",
      "xmlns:rs": "urn:oasis:names:tc:ebxml-regrep:xsd:rs:3.0",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0 ../../schema/ebRS/query.xsd"
    },
    "query:ResponseOption": [
      {
        "$": {
          "returnComposedObjects": "true", 
          "returnType": "LeafClass" //Define return type, ObjRef or LeafClass
        }
      }
    ],
    "rim:AdhocQuery": [
      {
        "$": {
          "id": " urn:uuid:14d4debf-8f97-4251-9a74-a90016b0af0d "
        },
        "rim:Slot": [] //Query keyword
      }
    ]
  }
}
/*
          {
            "$": {
              "name": "$XDSDocumentEntryPatientId"
            },
            "rim:ValueList": [
              {
                "rim:Value": [
                  "st3498702^^^&1.3.6.1.4.1.21367.2005.3.7&ISO"
                ]
              }
            ]
          },
*/

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