var Web3 =  require('web3');

var net = require('net');
var web3 = new Web3("qdata/dd1/geth.ipc", net);

async function invokeContract(){
	//web3.eth.defaultAccount = web3.eth.personal.getAccounts().then(console.log);
	let acc = await web3.eth.personal.getAccounts();
	  if (acc.err) {console.log(acc.err);}
	  else {console.log('Accounts available on this node:\n' + acc);}

	console.log('------------------------------------------');
	var deployerAccount = acc[0];
	console.log('Deploying with account:' + deployerAccount);
	var abi = 
	[
		{
			"inputs": [],
			"name": "checkLastID",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "Docid",
					"type": "uint256"
				}
			],
			"name": "retreiveFull",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "Docid",
					"type": "uint256"
				}
			],
			"name": "retreiveSearch",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "Docid",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "searchJSON",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "fullJSON",
					"type": "string"
				}
			],
			"name": "store",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];

	var contractAddress = require('./contractAddress.js');
	console.log('Contract Address: ' + contractAddress);

	var myContract = new web3.eth.Contract(abi, contractAddress, {
		from: deployerAccount,
	    gas: 10000000
	});

	var num = {
	  DocumentEntry: {
	    author: [ [Object], [Object] ],
	    availabilityStatus: 'N/A',
	    classCode: {
	      codingScheme: '1.3.6.1.4.1.19376.1.2.6.1',
	      displayName: 'Treatment Plan or Protocol'
	    },
	    comment: '',
	    confidentialityCode: {
	      codingScheme: '2.16.840.1.113883.5.25',
	      displayName: 'Restricted'
	    },
	    creationTime: '20061224',
	    entryUUID: 'N/A',
	    eventCodeList: [ [Object], [Object] ],
	    formatCode: {
	      codingScheme: '1.3.6.1.4.1.19376.1.2.3',
	      displayName: 'urn:ihe:iti:bppc:2007'
	    },
	    hash: 'e543712c0e10501972de13a5bfcbe826c49feb75',
	    healthcareFacilityTypeCode: {
	      codingScheme: '2.16.840.1.113883.6.96',
	      displayName: 'Private home-based care'
	    },
	    homeCommunityId: 'N/A',
	    languageCode: 'en-us',
	    legalAuthenticator: 'N/A',
	    limitedMetadata: 'N/A',
	    mimeType: 'N/A',
	    objectType: 'N/A',
	    patientId: 'IHEBLUE-2736^^^&1.3.6.1.4.1.21367.13.20.3000&ISO',
	    practiceSettingCode: {
	      codingScheme: '1.3.6.1.4.1.21367.2017.3',
	      displayName: 'Pathology'
	    },
	    referenceIdList: 'N/A',
	    repositoryUniqueId: '1.19.6.24.109.42.1',
	    serviceStartTime: '200612230800',
	    serviceStopTime: '200612230900',
	    size: '4',
	    sourcePatientId: '89765a87b^^^&1.3.4.5&ISO',
	    sourcePatientInfo: [
	      'PID-3|pid1^^^&1.2.3&ISO',
	      'PID-5|Doe^John^^^',
	      'PID-7|19560527',
	      'PID-8|M',
	      'PID-11|100 Main St^^Metropolis^Il^44130^USA'
	    ],
	    title: 'DocA',
	    typeCode: {
	      codingScheme: '2.16.840.1.113883.6.1',
	      displayName: 'LABORATORY REPORT.TOTAL'
	    },
	    uniqueId: '1.2.42.20190405034511.30',
	    URI: 'N/A'
	  },
	  SubmissionSet: {
	    author: [ [Object] ],
	    availabilityStatus: 'N/A',
	    comments: 'N/A',
	    contentTypeCodes: {
	      codingScheme: '2.16.840.1.113883.6.96',
	      displayName: 'Health Authority'
	    },
	    entryUUID: 'N/A',
	    homeCommunityId: 'N/A',
	    intendedRecipient: 'N/A',
	    limitedMetadata: 0,
	    patientId: 'IHEBLUE-2736^^^&1.3.6.1.4.1.21367.13.20.3000&ISO',
	    sourceId: '1.3.6.1.4.1.21367.4',
	    submissionTime: '20041225235050',
	    title: 'Physical',
	    uniqueId: '1.2.42.20190405034511.31',
	    comment: 'Annual physical'
	  },
	  Folder: {
	    availabilityStatus: 'N/A',
	    codeList: 'N/A',
	    comments: 'N/A',
	    entryUUID: 'N/A',
	    homeCommunityId: 'N/A',
	    lastUpdateTime: 'N/A',
	    limitedMetadata: 'N/A',
	    patientId: 'N/A',
	    title: 'N/A',
	    uniqueId: 'N/A'
	  },
	  Association: {
	    associationType: 'N/A',
	    sourceObject: 'N/A',
	    targetObject: 'N/A',
	    SubmissionSetStatus: 'N/A'
	  }
	}

	console.log(num);
	var Docid = 0;
	var nummer = JSON.stringify(num);

	myContract.methods.store(Docid, JSON.stringify(num), nummer).send({
		from: deployerAccount
	}).then(function(receipt){
		console.log(receipt);
	}).then(process.exit);
}

invokeContract();