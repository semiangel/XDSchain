/*
var data = {IdontKnowWhatsHere1: [ "item1", "item2", "item3"]};

var key = Object.keys(data)[0];
var values = data[key];

console.log(data);
console.log('----------------');
console.log(data[Object.keys(data)[0]]);
console.log('----------------');
console.log(key);
console.log('----------------');
console.log(values);
*/

const data = {IdontKnowWhatsHere1: [ "item1", "item2", "item3"]};

const [key, entryValues] = Object.entries(data)[0];

const values = Object.values(data)[0];

console.log(JSON.stringify(data, null, 4));
console.log('----------------');
console.log(key, entryValues);
console.log('----------------');
console.log(values);
