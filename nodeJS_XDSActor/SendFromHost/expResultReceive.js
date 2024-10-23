var net = require('net');
var fs = require("fs");
const port = 5656;

var counter = 0;
var messageArray = [];
var receiveCounter = 0;
var messageChunks = 0;
var expServer = net.createServer((socket) => {

    socket.on('data', function (data) {
        var dataGot = data.toString();
        console.log('Received packet....');
        console.log('==========================================');
        console.log(dataGot);
        console.log('==========================================');
        if (receiveCounter == 0 && messageChunks == 0) {
            if (dataGot.includes('ttc=')) {
                const matched = dataGot.match(/(\d+)/);
                if (matched) {
                    const numberPart = parseInt(matched[0], 10);
                    messageChunks = numberPart;
                } else {
                    console.log('No number found in the string');
                }
                socket.write("ACK");
                console.log('Total chunk = ' + messageChunks);
            }
            else {
                writeToFileSimple(dataGot);
            }
        }
        else {
            messageArray.push(data);
            receiveCounter++;
            console.log('sfghsfghsadfthg');
            console.log(receiveCounter);
            console.log(messageChunks);
            if (receiveCounter == messageChunks) {
                socket.write("FIN");
                var originalMessage = Buffer.concat(messageArray).toString();
                console.log("All packets received!");
                writeToFileAdv(originalMessage);
                messageArray = [];
                receiveCounter = 0;
                messageChunks = 0;
            }
            else {
                socket.write("ACK");
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

function writeToFileSimple(dataGot) {
    fs.writeFile("RetrieveLog_expResultLog.txt", dataGot, { flag: "a" }, function (err) {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
        counter++;
        console.log("Count: " + counter);
        if (counter == 10) {
            newLine();
            counter = 0;
        }
    });
}

function newLine () {
    fs.writeFile("RetrieveLog_expResultLog.txt", "\n", { flag: "a" }, function (err) {
        if (err) console.log(err);
        console.log("New line...");
    });
}

var expDocNumRec = 1;
var currentFileName = '';
function writeToFileAdv(dataGot) {
    currentFileName = "All_expResultLog" + expDocNumRec + ".txt";
    fs.writeFile(currentFileName, dataGot, { flag: "a" }, function (err) {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
        newLineAdv();
        counter++;
        console.log("Count: " + counter);
        if (counter == 10) {
            expDocNumRec++;
            counter = 0;
        }
    });
}

function newLineAdv () {
    fs.writeFile(currentFileName, "\n", { flag: "a" }, function (err) {
        if (err) console.log(err);
        console.log("New line...");
    });
}

expServer.listen(port, '0.0.0.0', () => {
    console.log('Listening for log on port ' + port);
});

