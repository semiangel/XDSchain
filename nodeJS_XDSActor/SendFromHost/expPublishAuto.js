var net = require('net');
var fs = require("fs");
const port = 5656;

var counter = 0;
var expServer = net.createServer((socket) => {

    socket.on('data', function (data) {
        var dataGot = data.toString();
        console.log('Received from client:', dataGot);
        fs.writeFile("expResultLog.txt", dataGot, { flag: "a" }, function (err) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
            counter++;
            console.log("Count: " + counter);
            if (counter == 10) {
                newLine();
                counter = 0;
            }
        });
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

function newLine () {
    fs.writeFile("expResultLog.txt", "\n", { flag: "a" }, function (err) {
        if (err) console.log(err);
        console.log("New line...");
    });
}

expServer.listen(port, '0.0.0.0', () => {
    console.log('Listening for log on port ' + port);
});

