var entries = [];
var participantKeywords = ["id", "lastName", "firstName", "numOfCompanions", "course", "advisor", "password"];

function buildParticipant(formName){
	
	var newParticipant = {};
	var content = [];
	
	content = getFormData(formName);
	
	// fill a new json object with the entered data
	var dataOffset = participantKeywords.length - content.length;
	for (i = dataOffset; i < participantKeywords.length; i++){
		newParticipant[participantKeywords[i]] = content[i - dataOffset];
	}
	
	return newParticipant;
}

function addEntry(participant){
	entries.push(participant);
	showNewEntry(participant);
}

function editEntry(participant){
	entries[participantIndex] = participant;
	showChangedEntry(participant);
}