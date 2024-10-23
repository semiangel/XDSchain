var net = require('net');
var Web3 = require('web3');
var web3 = new Web3("../data/geth.ipc", net, { timeout: 10000 });
var moment = require('moment');
var fs = require("fs");
const readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var hrstart = null;

var optionFlag = process.argv.slice(2);
var logRead = '';
var notBreakSearch = 1;
var searchKeywords = [];
var beginWithWhat = '';
var selectedLogType = null;
var logTypeCheck = 1;
var ipSrcCheck = 1;
var ipDstCheck = 1;
var ipCheck = 1;
var docIDCheck = 1;
var searchTypeCheck = 1;
var searchKWCheck = 1;
var timeCheck = 1;
var chosenChoiceCount = 0;

var initialSearch = 1;
var timeStart = null;
var timeEnd = null;
var logIterate = 0;
var matchedLogCheck = 1;
var selectedLog = null;
var timeCheckMark = true;
const formatTimeString = 'ddd MMM DD YYYY HH:mm:ss';
var foundCountForDisplay = 0;



function Main() {
    inputSearchKeywords();
}

function inputSearchKeywords() {
    console.log('Log Viewer Program');
    console.log('=========================');
    console.log('Do you know which Log Type you are looking for?: ');
    console.log('1) Yes');
    console.log('2) No');
    console.log('#) Quit');
    rl.question("(Specify number): ", function (selectedAttribute) {
        if (selectedAttribute == '#' || selectedAttribute == 'quit' || selectedAttribute == 'Quit') {
            console.log('Quit...');
            process.exit();
        }
        else if (selectedAttribute == '1') {
            beginWithLogType();
            beginWithWhat = 'Log Type';
        }
        else if (selectedAttribute == '2') {
            beginWithOther();
            beginWithWhat = 'Other';
        }
        else {
            console.log('Error...');
            process.exit();
        }
    });
}

function beginWithLogType() {
    console.log('=========================');
    console.log('Specify log type: ');
    console.log('1) Registering Log');
    console.log('2) Searching Log');
    console.log('3) Retrieval Log');
    console.log('#) Quit');
    logTypeCheck = null;
    rl.question("(Specify number): ", function (selectedAttribute) {
        if (selectedAttribute == '#' || selectedAttribute == 'quit' || selectedAttribute == 'Quit') {
            console.log('Quit...');
            process.exit();
        }
        else if (selectedAttribute == '1') {
            selectedLogType = 'Registering Log';
            searchKeywords.push(selectedLogType);
            displayCurrentSearchKeywordBeginWithLogType();

        }
        else if (selectedAttribute == '2') {
            selectedLogType = 'Searching Log';
            searchKeywords.push(selectedLogType);
            displayCurrentSearchKeywordBeginWithLogType();
        }
        else if (selectedAttribute == '3') {
            selectedLogType = 'Retrieval Log';
            searchKeywords.push(selectedLogType);
            displayCurrentSearchKeywordBeginWithLogType();
        }
        else {
            console.log('Error...');
            process.exit();
        }
    });
}

function displayCurrentSearchKeywordBeginWithLogType() {
    console.log('=========================');
    console.log('Current Search Keywords: ');
    console.log(searchKeywords);
    proceedAfterBeginWithLogType();
}

function proceedAfterBeginWithLogType() {
    console.log('=========================');
    if (selectedLogType == 'Registering Log' || selectedLogType == 'Retrieval Log') {
        if (chosenChoiceCount > 3) {
            thenProceed();
        }
        else {
            beginAskAfterBeginWithLogType();
        }
    }
    else if (selectedLogType == 'Searching Log') {
        if (chosenChoiceCount > 4) {
            thenProceed();
        }
        else {
            beginAskAfterBeginWithLogType();
        }
    }
}

function beginAskAfterBeginWithLogType() {
    console.log('Select log attributes for log search: ');
    var choiceNum = 0;
    var choiceMemSrcIP;
    var choiceMemDstIP;
    var choiceMemDocID;
    var choiceMemSearchType;
    var choiceMemSearchKW;
    var choiceMemTime;
    var choiceMemBegin;
    if (ipSrcCheck) {
        choiceNum++;
        choiceMemSrcIP = choiceNum;
        if (selectedLogType == 'Registering Log') {
            console.log(choiceNum + ') IP of Document Repository Actor');
        }
        else if (selectedLogType == 'Searching Log') {
            console.log(choiceNum + ') IP of Document Consumer Actor');
        }
        else if (selectedLogType == 'Retrieval Log') {
            console.log(choiceNum + ') IP of Document Consumer Actor');
        }
        else {
            console.log('Error...');
            process.exit();
        }
    }
    if (ipDstCheck) {
        choiceNum++;
        choiceMemDstIP = choiceNum;
        if (selectedLogType == 'Registering Log') {
            console.log(choiceNum + ') IP of Document Registry Actor');
        }
        else if (selectedLogType == 'Searching Log') {
            console.log(choiceNum + ') IP of Document Registry Actor');
        }
        else if (selectedLogType == 'Retrieval Log') {
            console.log(choiceNum + ') IP of Document Repository Actor');
        }
        else {
            console.log('Error...');
            process.exit();
        }
    }
    if (selectedLogType == 'Registering Log' || selectedLogType == 'Retrieval Log') {
        if (docIDCheck) {
            choiceNum++;
            choiceMemDocID = choiceNum;
            console.log(choiceNum + ') Document ID');
        }
    }
    else if (selectedLogType == 'Searching Log') {
        if (searchTypeCheck) {
            choiceNum++;
            choiceMemSearchType = choiceNum;
            console.log(choiceNum + ') Search Type');
        }
        if (searchKWCheck) {
            choiceNum++;
            choiceMemSearchKW = choiceNum;
            console.log(choiceNum + ') Search Keywords');
        }
    }
    if (timeCheck) {
        choiceNum++;
        choiceMemTime = choiceNum;
        console.log(choiceNum + ') Timestamp (Range)');
    }
    choiceNum++;
    choiceMemBegin = choiceNum;
    console.log(choiceNum + ') Begin Search');
    rl.question("(Specify number): ", function (selectedChoice) {
        if (selectedChoice == '#' || selectedChoice == 'quit' || selectedChoice == 'Quit') {
            console.log('Quit...');
            process.exit();
        }
        else if (selectedChoice == choiceMemSrcIP) {
            rl.question("(Specify IP): ", function (inputString) {
                var addingKeyword = ['SrcIP', inputString];
                searchKeywords.push(addingKeyword);
                chosenChoiceCount++;
                ipSrcCheck = null;
                displayCurrentSearchKeywordBeginWithLogType();
            });
        }
        else if (selectedChoice == choiceMemDstIP) {
            rl.question("(Specify IP): ", function (inputString) {
                var addingKeyword = ['DstIP', inputString];
                searchKeywords.push(addingKeyword);
                chosenChoiceCount++;
                ipDstCheck = null;
                displayCurrentSearchKeywordBeginWithLogType();
            });
        }
        else if (selectedChoice == choiceMemDocID) {
            rl.question("(Specify DocID): ", function (inputString) {
                var addingKeyword = ['DocID', inputString];
                searchKeywords.push(addingKeyword);
                chosenChoiceCount++;
                docIDCheck = null;
                displayCurrentSearchKeywordBeginWithLogType();
            });
        }
        else if (selectedChoice == choiceMemSearchType) {
            rl.question("(Specify Query Type): ", function (inputString) {
                var addingKeyword = ['queryType', inputString];
                searchKeywords.push(addingKeyword);
                chosenChoiceCount++;
                searchTypeCheck = null;
                displayCurrentSearchKeywordBeginWithLogType();
            });
        }
        else if (selectedChoice == choiceMemSearchKW) {
            rl.question("How many keywords?: ", function (inputNumber) {
                inputRound = inputNumber;
                askSearchKeyword();
            });
        }
        else if (selectedChoice == choiceMemTime) {
            askTime();
        }
        else if (selectedChoice == choiceMemBegin) {
            thenProceed();
        }
        else {
            console.log('Error...');
            process.exit();
        }
    });
}

var inputRound = 0;
var tempStoreSearchKW = [];
function askSearchKeyword() {
    if (inputRound > 0) {
        console.log('Adding META-data attribute as Search Keyword...');
        rl.question("(Specify META-data Attribute Name): ", function (inputAttName) {
            rl.question("(Specify META-data Attribute Value): ", function (inputAttValue) {
                var tempSubStoreSearchKW = [inputAttName, inputAttValue];
                tempStoreSearchKW.push(tempSubStoreSearchKW);
                inputRound--;
                askSearchKeyword();
            });
        });
    }
    else {
        tempStoreSearchKW.unshift('searchKW');
        searchKeywords.push(tempStoreSearchKW);
        chosenChoiceCount++;
        searchKWCheck = null;
        displayCurrentSearchKeywordBeginWithLogType();
    }
}

const isValidTimeFormat = (time) => {
    const regex = /^\d{2}:\d{2}:\d{4} \d{2}:\d{2}:\d{2}$/;
    return regex.test(time);
};

function askTime() {
    if (!timeStart) {
        rl.question('Specify Time Begin: (DD:MM:YYYY HH:mm:ss): ', (startTime) => {
            if (!isValidTimeFormat(startTime)) {
                console.log('Invalid time format. Please follow the DD:MM:YY HH:mm:ss format.');

            } else {
                timeStart = startTime;
            }
            askTime();
        });
    }
    else {
        if (!timeEnd) {
            rl.question('Specify Time End (DD:MM:YYYY HH:mm:ss): ', (endTime) => {
                if (!isValidTimeFormat(endTime)) {
                    console.log('Invalid time format. Please follow the DD:MM:YY HH:mm:ss format.');
                } else {
                    timeEnd = endTime;
                }
                askTime();
            });
        }
        else {
            addTime();
        }
    }
}

function addTime() {
    var tempSubStoreSearchKW = ['timeRange', timeStart, timeEnd];
    searchKeywords.push(tempSubStoreSearchKW);
    timeCheck = null;
    chosenChoiceCount++;
    displayCurrentSearchKeywordBeginWithLogType();
}

function beginWithOther() {
    proceedAfterBeginWithOther();
}

function proceedAfterBeginWithOther() {
    console.log('=========================');
    if (chosenChoiceCount > 2) {
        thenProceed();
    }
    else {
        beginAskAfterBeginWithOther();
    }
}

function beginAskAfterBeginWithOther() {
    console.log('Select log attributes for log search: ');
    var choiceNum = 0;
    var choiceMemIP;
    var choiceMemDocID;
    var choiceMemTime;
    var choiceMemBegin;
    if (ipCheck) {
        choiceNum++;
        choiceMemIP = choiceNum;
        console.log(choiceNum + ') IP of Known Actor');
    }
    if (docIDCheck) {
        choiceNum++;
        choiceMemDocID = choiceNum;
        console.log(choiceNum + ') Document ID');
    }
    if (timeCheck) {
        choiceNum++;
        choiceMemTime = choiceNum;
        console.log(choiceNum + ') Timestamp (Range)');
    }
    choiceNum++;
    choiceMemBegin = choiceNum;
    console.log(choiceNum + ') Begin Search');
    rl.question("(Specify number): ", function (selectedChoice) {
        if (selectedChoice == '#' || selectedChoice == 'quit' || selectedChoice == 'Quit') {
            console.log('Quit...');
            process.exit();
        }
        else if (selectedChoice == choiceMemIP) {
            rl.question("(Specify IP): ", function (inputString) {
                var addingKeyword = ['targetIP', inputString];
                searchKeywords.push(addingKeyword);
                chosenChoiceCount++;
                ipCheck = null;
                displayCurrentSearchKeywordBeginWithOther();
            });
        }
        else if (selectedChoice == choiceMemDocID) {
            rl.question("(Specify DocID): ", function (inputString) {
                var addingKeyword = ['DocID', inputString];
                searchKeywords.push(addingKeyword);
                chosenChoiceCount++;
                docIDCheck = null;
                displayCurrentSearchKeywordBeginWithOther();
            });
        }
        else if (selectedChoice == choiceMemTime) {
            askTimeOther();
        }
        else if (selectedChoice == choiceMemBegin) {
            thenProceed();
        }
        else {
            console.log('Error...');
            process.exit();
        }
    });
}

function displayCurrentSearchKeywordBeginWithOther() {
    console.log('=========================');
    console.log('Current Search Keywords: ');
    console.log(searchKeywords);
    proceedAfterBeginWithOther();
}

function askTimeOther() {
    if (!timeStart) {
        rl.question('Specify Time Begin: (DD:MM:YYYY HH:mm:ss): ', (startTime) => {
            if (!isValidTimeFormat(startTime)) {
                console.log('Invalid time format. Please follow the DD:MM:YY HH:mm:ss format.');
            } else {
                timeStart = startTime;
            }
            askTimeOther();
        });
    }
    else {
        if (!timeEnd) {
            rl.question('Specify Time End (DD:MM:YYYY HH:mm:ss): ', (endTime) => {
                if (!isValidTimeFormat(endTime)) {
                    console.log('Invalid time format. Please follow the DD:MM:YY HH:mm:ss format.');
                } else {
                    timeEnd = endTime;
                }
                askTime();
            });
        }
        else {
            addTimeOther();
        }
    }
}

function addTimeOther() {
    var tempSubStoreSearchKW = ['timeRange', timeStart, timeEnd];
    searchKeywords.push(tempSubStoreSearchKW);
    timeCheck = null;
    chosenChoiceCount++;
    displayCurrentSearchKeywordBeginWithOther();
}

function underConstruction() {
    console.log('(Under Construction... Stopped...)');
    rl.close();
    process.exit();
}

function notifyUnderConstruction() {
    console.log('This section of the program is still under construction...');
}

var stringSearchKW = [];
var timeSearchKW = [];

async function thenProceed() {
    console.log('Proceed...');
    //Showing searchKeywords received from input interface or experiment mode
    //console.log(searchKeywords);

    var markSearchingLog = false;
    if (Array.isArray(searchKeywords)) {
        for (let i = 0; i < searchKeywords.length; i++) {
            if (searchKeywords[i] == 'Registering Log' || searchKeywords[i] == 'Searching Log' || searchKeywords[i] == 'Retrieval Log') {
                stringSearchKW.push(searchKeywords[i]);
                if (searchKeywords[i] == 'Searching Log' && markForExperimentSend) {
                    markSearchingLog = true;
                }
            } else {
                if (searchKeywords[i][0] == 'targetIP' || searchKeywords[i][0] == 'DocID' || searchKeywords[i][0] == 'queryType') {
                    if (markSearchingLog) {
                        var position = docUniqueId.indexOf(searchKeywords[i][1]);
                        if (position !== -1) {
                            var finalTarget = docUniqueIdAlt[position];
                            stringSearchKW.push('' + finalTarget);
                            markSearchingLog = false;
                        }
                        else {
                            stringSearchKW.push(searchKeywords[i][1]);
                        }
                    }
                    else {
                        stringSearchKW.push(searchKeywords[i][1]);
                    }
                } else if (searchKeywords[i][0] == 'timeRange') {
                    const timeBegin = moment(searchKeywords[i][1], 'DD:MM:YYYY HH:mm:ss');
                    const timeEnd = moment(searchKeywords[i][2], 'DD:MM:YYYY HH:mm:ss');
                    timeSearchKW.push(timeBegin);
                    timeSearchKW.push(timeEnd);
                } else if (searchKeywords[i][0] == 'searchKW') {
                    stringSearchKW.push(searchKeywords[i][1].toString());
                } else if (searchKeywords[i][0] == 'SrcIP' || searchKeywords[i][0] == 'DstIP') {
                    if (searchKeywords[0] == 'Registering Log') {
                        if (searchKeywords[i][0] == 'SrcIP') {
                            stringSearchKW.push('from Document Repository: ' + searchKeywords[i][1]);
                        } else if (searchKeywords[i][0] == 'DstIP') {
                            stringSearchKW.push('to Document Registry: ' + searchKeywords[i][1]);
                        }
                    } else if (searchKeywords[0] == 'Searching Log') {
                        if (searchKeywords[i][0] == 'SrcIP') {
                            stringSearchKW.push('from Document Consumer: ' + searchKeywords[i][1]);
                        } else if (searchKeywords[i][0] == 'DstIP') {
                            stringSearchKW.push('to Document Registry: ' + searchKeywords[i][1]);
                        }
                    } else if (searchKeywords[0] == 'Retrieval Log') {
                        if (searchKeywords[i][0] == 'SrcIP') {
                            if (markForExperimentSend) {
                                stringSearchKW.push('from Document Consumer');
                            }
                            else {
                                stringSearchKW.push('from Document Consumer: ' + searchKeywords[i][1]);
                            }
                        } else if (searchKeywords[i][0] == 'DstIP') {
                            if (markForExperimentSend) {
                                stringSearchKW.push('to Document Repository');
                            }
                            else {
                                stringSearchKW.push('to Document Repository: ' + searchKeywords[i][1]);
                            }
                        }
                    }
                } else {
                    console.log('Something went wrong... Exit...1 ' + searchKeywords[i]);
                    rl.close();
                    process.exit();
                }
            }
        }
    } else {
        console.log('Something went wrong... Exit...2');
        rl.close();
        process.exit();
    }
    console.log('String Search Keywords:');
    console.log(stringSearchKW);
    console.log('Time Search Keywords:');
    console.log(timeSearchKW);
    await searchLog();
}

async function searchLog() {
    if (notBreakSearch) {
        await readLogContract(logIterate);
    } else {
        finishProgram();
    }
}

async function readLogContract(logID) {
    try {
        let acc = await web3.eth.personal.getAccounts();
        if (acc.err) {
            console.log(acc.err);
        } else {
            initialSearch && console.log('Accounts available on this node:\n' + acc);
        }

        initialSearch && console.log('------------------------------------------');
        var deployerAccount = acc[0];
        initialSearch && console.log('Deploying with account:' + deployerAccount);
        var abi = [
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "logValue",
                        "type": "string"
                    }
                ],
                "name": "storeLog",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "assignedLogID",
                        "type": "uint256"
                    }
                ],
                "name": "readLog",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];

        var contractAddress = require('./logContractAddress.js');
        initialSearch && console.log('Contract Address: ' + contractAddress);

        var myContract = new web3.eth.Contract(abi, contractAddress, {
            from: deployerAccount,
            gas: 30000000
        });

        initialSearch && console.log('Checking log...');
        initialSearch && console.log('=====================================');
        initialSearch = null;
        if (timeCheckMark) {
            hrstart = process.hrtime();
            timeCheckMark = null;
        }

        selectedLog = await myContract.methods.readLog(logID).call({ from: deployerAccount });

        if (!selectedLog) {
            console.log('No more log can be found...');
            var lastAvailLog = logID - 1;
            console.log('Last available log ID: ' + lastAvailLog);
            allLogReached = true;
            if (matchedLogCheck) {
                console.log('Result not found...');
            }
            notBreakSearch = null; //break search
        }

        await checkLog();
    } catch (err) {
        console.error(err);
    }
}

async function checkLog() {
    logIterate++;
    var correctScore = 0;
    var maxCorrectScore = 0;

    if (!selectedLog) {
        console.log('selectedLog is null. Skipping this iteration.');
        await searchLog();
        return;
    }

    if (stringSearchKW.length > 0) {
        maxCorrectScore = maxCorrectScore + stringSearchKW.length;
        for (let j = 0; j < stringSearchKW.length; j++) {
            if (selectedLog.includes(stringSearchKW[j])) {
                correctScore++;
            }
        }
    }

    if (timeSearchKW.length > 0) {
        maxCorrectScore = maxCorrectScore + 1;
        var slicedSelectedLog = selectedLog.split('|');
        var selectedLogTimeRaw = slicedSelectedLog[slicedSelectedLog.length - 1];
        var selectedLogTimeCleaned = selectedLogTimeRaw.replace(' GMT+0000 (Coordinated Universal Time)"', '');
        const logTimestamp = moment(selectedLogTimeCleaned, formatTimeString);
        const searchTimeBegin = timeSearchKW[0];
        const searchTimeEnd = timeSearchKW[1];
        const isBetween = logTimestamp.isBetween(searchTimeBegin, searchTimeEnd);
        if (isBetween) {
            correctScore++;
        }
    }

    //Iterte gern here
    if (correctScore == maxCorrectScore) {
        console.log(selectedLog);
        matchedLogCheck = null;
        var hrend = process.hrtime(hrstart);
        console.log('==============================');
        var totalMillisec = hrend[0] * 1000 + (hrend[1] / 1000000);
        console.info('Execution time (hr): %dms', totalMillisec);
        foundCountForDisplay++;
        console.log('Found matched result no. ' + foundCountForDisplay);
        if (markForExperimentSend) {
            if (markForExperimentSend == 1) {
                timeRecord(totalMillisec + ',');
            } else if (markForExperimentSend == 2) {
                advTimeRecord(totalMillisec, 'Recording');
            }
        }
        console.log('==============================');
    }
    await searchLog();
}

function finishProgram() {
    console.log('Finished...');
    if (markForExperimentSend != 2) {
        rl.close();
        process.exit();
    } else {
        advTimeRecord('', 'Recording');
    }
}

const connectClient = (client, host, port) => {
    return new Promise((resolve, reject) => {
        client.connect(port, host, () => {
            console.log(`CONNECTED TO: ${host}:${port}`);
            resolve();
        });
        client.on('error', (err) => {
            reject(err);
        });
    });
};

const writeClient = (client, data) => {
    return new Promise((resolve, reject) => {
        client.write(data, () => {
            console.log(`Data sent: ${data}`);
            resolve();
        });
        client.on('error', (err) => {
            reject(err);
        });
    });
};

const endClient = (client) => {
    return new Promise((resolve) => {
        client.end(() => {
            console.log('Connection ended');
            resolve();
        });
        client.on('close', () => {
            console.log('Connection closed');
            resolve();
        });
    });
};

// Experiment Exclusive
var expClient = new net.Socket();
var timeRecNotEstablished = 1;
//This work in registering_log
const docUniqueId = ['None', 'experimentUniqueId01-780d23a4dd7b5514289a32b38bc6c167',
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

//The searching log cannot use unique doc id because search keyword were not used doc unique id
const docUniqueIdAlt = ['None', '^Smitty^Gerald^^^',
    '^Tymoteusz^Mccabe^^^',
    '^Sharna^Hood^^^',
    '^Bear^Ryan^^^',
    '^Katya^Cairns^^^',
    'TJay',
    '^Mujtaba^Palacios^^^',
    '^Mahima^Ho^^^',
    'Nuala',
    '^Harriette^Whitworth^^^'];

async function timeRecord(timeRec) {
    console.log('Time Record: ' + timeRec);
    var expHOST = "192.168.1.122";
    var expPORT = "5656";

    if (timeRecNotEstablished) {
        await connectClient(expClient, expHOST, expPORT);
        timeRecNotEstablished = null;
    }

    await writeClient(expClient, timeRec);

    expClient.on('end', function () {
        console.log('Connection ended');
    });

    expClient.on('close', function () {
        console.log('Connection closed');
    });
}

var allLogReached = null;
var timeRecArray = [];
var timeRecString = '';
const chunkSize = 1024;

async function advTimeRecord(timeRec, flow) {
    if (flow == 'Recording') {
        timeRecArray.push(timeRec);
        if (allLogReached) {
            allLogReached = null;
            logIterate = 0;
            for (let i = 0; i < timeRecArray.length; i++) {
                timeRecString = timeRecString + timeRecArray[i];
                timeRecString = timeRecString + ',';
            }
            await advTimeRecordSending(timeRecString);
            timeRecArray = [];
            timeRecString = '';
        }
    } else if (flow == 'Next') {
        if (markForRepeat) {
            docNumber++;
            if (docNumber > 10) {
                docNumber = 1;
            }
            searchKeywords[3][1] = docUniqueId[docNumber];
            resetVariables();
            repeatTimes--;
            if (repeatTimes == 1) {
                markForRepeat = null;
            }
            await pause(10000);
            await thenProceed();
        } else {
            console.log('All done...');
            process.exit();
        }
    }
}

async function advTimeRecordSending(timeRecSet) {
    var expHOST = "192.168.1.122";
    var expPORT = "5656";
    var recordChunks = [];

    await connectClient(expClient, expHOST, expPORT);
    console.log('CONNECTED TO: ' + expHOST + ':' + expPORT);
    recordChunks = [];
    var chunk = "";
    for (let i = 0; i < timeRecSet.length; i++) {
        chunk += timeRecSet[i];
        if (chunk.length === chunkSize || i === timeRecSet.length - 1) {
            recordChunks.push(chunk);
            chunk = "";
        }
    }
    await prepareRecordSend(recordChunks);

    expClient.on('data', async function (data) {
        var dataGot = data.toString();
        if (dataGot == "ACK") {
            await sendNextTimeRecord(recordChunks);
        } else if (dataGot == "FIN") {
            await endClient(expClient);
            console.log('Record fully sent...');
            await advTimeRecord(null, 'Next');
        } else {
            console.log('Else, no handling method');
        }
    });

    expClient.on('end', function () {
        console.log('Connection ended');
    });

    expClient.on('close', function () {
        console.log('Connection closed');
    });

    async function prepareRecordSend(chunks) {
        var chunkCount = chunks.length;
        if (chunkCount) {
            await writeClient(expClient, 'ttc=' + chunkCount);
            console.log('Total chunk count sent...' + chunkCount);
        }
    }

    let j = 0;
    async function sendNextTimeRecord(chunks) {
        if (j < chunks.length) {
            await writeClient(expClient, chunks[j]);
            j++;
        }
    }
}

function resetVariables() {
    stringSearchKW = [];
    timeSearchKW = [];
    logIterate = 0;
    matchedLogCheck = 1;
    selectedLog = null;
    timeCheckMark = true;
    notBreakSearch = 1;
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var docNumber = null;
function expArgumentInput(optionFlag) {
    console.log('Prepare experiment components...');
    var logTypePack = null;
    if (optionFlag[0] == '1') {
        logTypePack = 'Registering Log';
    } else if (optionFlag[0] == '2') {
        logTypePack = 'Searching Log';
    } else if (optionFlag[0] == '3') {
        logTypePack = 'Retrieval Log';
    } else if (optionFlag[0] == '0') {
        logTypePack = null;
    } else {
        console.log('...What!?...Exit');
        process.exit();
    }
    const srcIPFixed = '192.168.1.' + optionFlag[1];
    const dstIPFixed = '192.168.1.' + optionFlag[2];
    docNumber = Number(optionFlag[3]);
    if (optionFlag.length > 2) {
        searchKeywords = [
            logTypePack,
            ['SrcIP', srcIPFixed],
            ['DstIP', dstIPFixed],
            ['DocID', docUniqueId[docNumber]],
            ['timeRange', optionFlag[4] + ' ' + optionFlag[5], optionFlag[6] + ' ' + optionFlag[7]]
        ]
    }
    if (optionFlag[2] == '0') {
        searchKeywords.shift();
    }
    if (optionFlag[optionFlag.length - 1]) {
        if (optionFlag[optionFlag.length - 1] == 'exp') {
            markForExperimentSend = 1;
        } else {
            if (!isNaN(optionFlag[optionFlag.length - 1])) {
                markForRepeat = 1;
                repeatTimes = Number(optionFlag[optionFlag.length - 1]);
                if (repeatTimes < 1) {
                    markForRepeat = null;
                }
            }
            if (optionFlag[optionFlag.length - 2] == 'exp') {
                console.log('Experiment mode...');
                markForExperimentSend = 1;
            } else if (optionFlag[optionFlag.length - 2] == 'advExp') {
                console.log('Advance experiment mode...');
                markForExperimentSend = 2;
            }
        }
    }
    thenProceed();
}

var markForExperimentSend = null;
var markForRepeat = null;
var repeatTimes = null;
if (optionFlag.length != 0) {
    //console.log(optionFlag);
    expArgumentInput(optionFlag);
} else {
    Main();
}
