var moment = require('moment'); // require
//moment().format(); 

var stringTimeA = '20041225';
var dateTimeA = moment.utc(stringTimeA, 'YYYYMMDDHHmmss');

var stringTimeB = '20050101';
var dateTimeB = moment.utc(stringTimeB, 'YYYYMMDDHHmmss');

var stringTimeC = '200412252400';
var dateTimeC = moment.utc(stringTimeC, 'YYYYMMDDHHmmss');

console.log(dateTimeA);
console.log(dateTimeB);
console.log(dateTimeC);

var compareTime = moment(dateTimeC).isBetween(dateTimeA, dateTimeB, undefined, '[]');
console.log(compareTime);

var timeAttributes = {
	creationTimeFrom: null,
	compareTimeTo: null
}

console.log(timeAttributes.creationTimeFrom);

if (timeAttributes.creationTimeFrom){
	console.log(timeAttributes.creationTimeFrom);
}