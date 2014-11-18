var entries = [];
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

function addEntry(participant){
	entries.push(participant);
	showNewEntry(participant);
}

function editEntry(participant){
	entries[participantIndex] = participant;
	showChangedEntry(participant);
}

// Get ready to change the view to a form when a button was clicked
$(document).ready(function(){
	$("table").on("click", "button.btn-primary", function(event) {
		$("#participant-table").removeClass("active");
		$(".nav-tabs .active").removeClass("active");
		
		participantIndex = $(this).data("index");
		var participantEntry = entries[participantIndex];
		var inputFields;
		
		$("#feedback").hide();
		if ($(this).text() == "Bearbeiten"){
			$("#edit-form").addClass("active");
			inputFields = $("#edit-form").find(":text");
		}
		else{
			$("#delete-form").addClass("active");
			inputFields = $("#delete-form").find(":text");
		}
		
		for (var i = 1; i <= inputFields.length; i++){
			var participantData = participantEntry[participantKeywords[i]];
			inputFields[i - 1].value = participantData;
		}
    });
});