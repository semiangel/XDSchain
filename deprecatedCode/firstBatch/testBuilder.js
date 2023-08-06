var xml2js = require('xml2js');

var obj = {root: {$: {id: "my id"}, _: "my inner text"}};
console.log(obj);

var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);

console.log('\n' + xml);