var convert = require('xml-js');
var xml =
'<?xml version="1.0" encoding="utf-8"?>' +
'<note importance="high" logged="true">' +
'    <title>Happy</title>' +
'    <todo>Work</todo>' +
'    <todo>Play</todo>' +
'</note>';
var result1 = convert.xml2js(xml, {compact: true, spaces: 4});
var result2 = convert.xml2js(xml, {compact: false, spaces: 4});
console.log(result1, '\n', result2);