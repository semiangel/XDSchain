var greet = "It's me";
var greeting = "It's me!";

function taktai() {
	greeting = Itsme();
	greet = greeting;
	console.log(greeting + ' from taktai()');
}

async function hello() {
	greeting = await giveValue();
	greet = greeting;
	logging();
	console.log(greeting + ' from hello()');
};

function giveValue() {
	return 'Hello';
}

function Itsme() {
	return 'Itsme';
}

function logging() {
	console.log(greet + ' from logging()');
}

hello();
logging();
taktai();
logging();