var Received_ITI_42(XMLMessage){
	var JSON_attributes = InterpretXMLtoJSON(XMLMessage);
	var Assorted_JSON = AssortMetadataAttributes(JSON_attributes);
	var SmartcontractCompatible = SortInto_SmartcontractCompatibleFormat(Assorted_JSON);
	return SmartcontractCompatible;
}

var Received_ITI_18(XMLMessage){
	var JSON_attributes = InterpretXMLtoJSON(XMLMessage);
	var Assorte_JSON = AssortMetadataAttributes(JSON_attributes);
	var SearchKeywords = SortInto_SearchKeywordsFormat(Assorted_JSON);
	return SearchKeywords;
}

var DocumentRegistering_Into_Blockchain() {
	var lastID = Invoke_CheckLastID_SmartcontractFunction();
	var NewID = lastID + 1;
	Invoke_DocumentRegister_SmartcontractFunction(NewID);
	var registerStatus 
	if (not Error) {
		registerStatus = "Success";
	}
	return registerStatus;
}

var DocumentSearch_Within_Blockchain(SearchKeywords) {
	var SearchResult;
	var lastID = Invoke_CheckLastID_SmartcontractFunction();
	for (i = 0; i < lastID; i++) {
		var StoredValue = Invoke_ReadStoredValue_SmartcontractFunction(i);
		if (SearchKeywords == StoredValue) {
			SearchResult = StoredValue;
		}
	}
	return SearchResult;
}

Main() {
	while (True) {
		var ReceivedMessage = Wait_For_XMLMessage();
		if (ReceivedMessage == "ITI-42"){ 
		//Section 4.2.3.1
			var SmartcontractCompatible = Received_ITI_42(XMLMessage) 
			//Section 4.2.3.1.1 
			var registerStatus = DocumentRegistering_Into_Blockchain(SmartcontractCompatible); 
			//Section 4.2.3.1.2
			Send_Response_To_XDSDocumentRepositoryActor(registerStatus);
		}
		else if (ReceivedMessage == "ITI-18"){ 
		//Section 4.2.3.2
			var SearchKeywords = Received_ITI_18(XMLMessage); 
			//Section 4.2.3.2.1
			var SearchResult = DocumentSearch_Within_Blockchain(SearchKeywords); 
			//Section 4.2.3.2.2
			var ITI_18_Response = SortResult_Into_ITI18ResponseFormat(SearchResult);
			Send_Response_To_XDSDocumentConsumerActor(ITI_18_Response);
		}
	}
}