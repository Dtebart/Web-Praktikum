function checkInput(event){
	var idName = $(event).attr("id");
	return isValid($(event).val(), "#" + idName);
}

function isValid(fieldContent, fieldName){
	var formgroup = $(fieldName).parent().parent();
	if (fieldContent == ""){
		formgroup.addClass("has-error");
		formgroup.removeClass("has-success");
		return false;
	}
	else{
		formgroup.addClass("has-success");
		formgroup.removeClass("has-error");
		return true;
	}
}

$(document).ajaxError(function(event,xhr,options,exc){
	if (xhr.status == 403){
		showFeedback("Kennwort fehlerhaft!", false);
	}
});