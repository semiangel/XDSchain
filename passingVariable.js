var variableHere = 0;

function one (myCallback) {
	for (i = 0; i < 11; i++) {
		two();
		console.log(variableHere);
	}
}

function two () {
	variableHere++;
}

one();