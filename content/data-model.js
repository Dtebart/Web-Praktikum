var entries = new Array();
var participantKeywords = ["id", "lastName", "firstName", "numOfCompanions", "course", "advisor", "password"];
var participantIndex;

function buildParticipant(formName){
	var newParticipant = {};
	var content = [];
	
	if (formName != "registrate-form"){
		newParticipant["id"] = entries[participantIndex]["id"];
	}
	
	// fill a new json object with the entered data
	for (i = 1; i < participantKeywords.length; i++){
		content[i] = $("#" + formName + " " + "#" + participantKeywords[i]).val();
		newParticipant[participantKeywords[i]] = content[i];
	}
							
	return newParticipant;
}