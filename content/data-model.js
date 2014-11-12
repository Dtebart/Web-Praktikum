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

function addEntry(participant){
	entries.push(participant);
	renderNewEntry(participant);
}

// Get ready to change the view to a form when a button was clicked
$(document).ready(function(){
	$("table").on("click", "button.btn-primary", function(event) {
		$("#participant-table").removeClass("active");
		$(".nav-tabs .active").removeClass("active");
		
		participantIndex = $(this).data("index");
		var participantEntry = entries[participantIndex];
		var inputFields;
		
		if ($(this).text() == "Bearbeiten"){
			$("#feedback").hide();
			$("#edit-form").addClass("active");
			inputFields = $("#edit-form").find(":text");
		}
		else{
			$("#feedback").hide();
			$("#delete-form").addClass("active");
			inputFields = $("#delete-form").find(":text");
		}
		
		for (var i = 1; i <= inputFields.length; i++){
			var participantData = participantEntry[participantKeywords[i]];
			console.log(participantData);
			inputFields[i - 1].value = participantData;
		}
    });
});