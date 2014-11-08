// Fetch a list of registrated users from the server
$(document).ready(function(){
	$.get("get_list", function(data,status){
		var participantsStr = data.replace(/'/g, '"');
		var participantList = JSON.parse(participantsStr);
		for (i = 0; i < participantList.length; i++){
			addEntry(participantList[i]);
		}
	});
});

// Get ready to change the view to a form when a button was clicked
$(document).ready(function(){
	$("table").on("click", "button.btn-primary", function(event) {
		$("#participant-table").removeClass("active");
		$(".nav-tabs .active").removeClass("active");
		
		participantIndex = $(this).data("index");
		var participantEntry = entries[participantIndex];
		var inputFields;
		
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
			console.log(participantData);
			inputFields[i - 1].value = participantData;
		}
    });
});