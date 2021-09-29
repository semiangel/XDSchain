var fs = require('fs');
var net = require('net');
var util = require('util');
var moment = require('moment');
var csv = require('csvtojson');
var lodash = require('lodash');
const Cryptr = require('cryptr');

var csvFilePath = 'div2.csv';

var dbArray = [];
var dbJSONFormat = {
	'countID': null,
	'fullID': null,
	'info': {
    	'assetID': null,
	    'name': null,
	    'description': null,
	    'pricePerUnit': null,
	    'purchaseDate': null, //YYYYMMDD
	    'lastEdited': {
			'author': null,
			'date': null
	    },
	    'properties': {
			'brand': null,
			'type': null,
			'design': null,
			'size': null,
			'shape': null
	    },
	    'registeredNumber': null,
	    'budgetType': null,
	    'receivingMethod': null,
	    'distributor': null,
	    'responsibilityProvider': null,
	    'useLocation': {
			'setLocation': null,
			'lastUpdated': null
	    },
	    'durability': {
			'priceBudget': null,
			'durableTime': null,
			'wreckageValue': null,
			'creepPriceRate': null
	    },
	    'lastUsage': [],
	    'lastUser': [],
	    'lastCheck': [],
	    'brokenStatus': {
			'updatedStatus': null,
			'clearanceDate': null,
			'repairHistory': [],
			'lastUpdated': null
	    },
	    'note': null
	}
}

var dbLastUsage = {
	'setUsage': null,
	'date': null
}

var dbLastUser = {
	'setUser': null,
	'date': null
}

var dbLastCheck = {
	'date': null
}

var dbRepairHistory = {
	'date': null,
	'price': null,
	'repairProvider': null,
	'symtom': null
}

function Main () {
	convertCSV();
}

function convertCSV () {
	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
	    sortJSON(jsonObj);
	})
}

function sortJSON (jsonObj) {
	//console.log(jsonObj.length)
	var dbJSONContainer = [];
	for (i = 0; i < jsonObj.length; i++){
		dbJSONContainer[i] = lodash.cloneDeep(dbJSONFormat);
		if(jsonObj[i]['fullID']){
			dbJSONContainer[i]['fullID'] = lodash.cloneDeep(jsonObj[i]['fullID']);
		}
		if(jsonObj[i]['name']){
			dbJSONContainer[i]['info']['name'] = lodash.cloneDeep(jsonObj[i]['name']);
		}
		if(jsonObj[i]['registeredNumber']){
			dbJSONContainer[i]['info']['registeredNumber'] = lodash.cloneDeep(jsonObj[i]['registeredNumber']);
		}
		if(jsonObj[i]['pricePerUnit']){
			dbJSONContainer[i]['info']['pricePerUnit'] = lodash.cloneDeep(jsonObj[i]['pricePerUnit']);
		}
		if(jsonObj[i]['purchaseDate']){
			dbJSONContainer[i]['info']['purchaseDate'] = lodash.cloneDeep(jsonObj[i]['purchaseDate']);
		}
		if(jsonObj[i]['setLocation']){
			dbJSONContainer[i]['info']['useLocation']['setLocation'] = lodash.cloneDeep(jsonObj[i]['setLocation']);
		}
		if(jsonObj[i]['assetID']){
			dbJSONContainer[i]['info']['assetID'] = lodash.cloneDeep(jsonObj[i]['assetID']);
		}
		if(jsonObj[i]['note']){
			dbJSONContainer[i]['info']['note'] = lodash.cloneDeep(jsonObj[i]['note']);
		}
		//==============================
		dbArray.push(dbJSONContainer[i]);
	}
	console.log(dbArray);
}

Main();
 
// Async / await usage
//const jsonArray= await csv().fromFile(csvFilePath);