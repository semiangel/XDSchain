var objMan = { 
	bookstore: {
		book: {
			title: 'Yoyoyo', 
			author: 'Caramel', 
			Date: 'Once upon a time'
		}
	}
};

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