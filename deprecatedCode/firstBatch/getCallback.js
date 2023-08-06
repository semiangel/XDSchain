var username = "Faa";

var getUserName = function( result ) {            
    // get the username somehow
    username = "Foo";    
    result( username );
};

var saveUserInDatabase = function( username ) {
    console.log("User: " + username + " is saved successfully.")
};

getUserName( saveUserInDatabase );