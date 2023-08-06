var objMan = { 
	bookstore: {
		book: {
			title: 'Yoyoyo', 
			author: 'Caramel', 
			Date: 'Once upon a time'
		}
	}
}

//console.log(objMan);
//console.log(objMan.bookstore);
//console.log(objMan.bookstore.book);
console.log(objMan.bookstore.book.Date);

var documentID = {
            creationTime: objMan.bookstore.book.Date,
            languageCode: 0,
            serviceStartTime: 0,
            serviceStopTime: 0,
            sourcePatientId: 0,
            sourcePatientInfo: 0
}

console.log(documentID.creationTime);

var objArray = {
	author: [{
		authorPerson: 'N/A',
		authorInstitution: 'N/A',
		authorSpecialty: 'N/A'
	}]
}

objArray.author.push({
		authorPerson: 'Billy',
		authorInstitution: 'GG',
		authorSpecialty: 'EZ'
	});

objArray.author.push(objArray.author[0]);

for (var i = 0; i < objArray.author.length; i++){
	console.log(objArray.author[i]);
}

objArray.author[2].authorPerson = 'Rando';

for (var i = 0; i < objArray.author.length; i++){
	console.log(objArray.author[i]);
}