var text;

text = 
"<bookstore>" + 
	"<book>" +
		"<title>Everyday Italian</title>" +
		"<author>Giada De Laurentiis</author>" +
		"<year>2005</year>" +
	"</book>" + 
"</bookstore>";

console.log('\n' + text);
console.log('\n');

var parseString = require('xml2js').parseString;
//var xml = "<root>Hello xml2js!</root>"

parseString(text, function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log('============================================');
    console.log(result.bookstore);
    console.log('============================================');
    console.log(result.bookstore.book);
    console.log('============================================');
    console.log(result.bookstore.book[0]);
    console.log('============================================');
    console.log(result.bookstore.book[0].title);
    console.log('============================================');
    console.log(result.bookstore.book[0].title[0]);
});