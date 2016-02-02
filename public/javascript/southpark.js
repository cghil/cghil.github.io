$(document).ready(function(){
	selectLineUp();

	$('button').click(function(){
		resetButton();
		selectLineUp();
	});
});

var characters = ["stan", "kyle", "kenny", "cartman", "wendy", "ike", "tweek"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function selectLineUp(){
	$('.tile').click(function(){
		$(this).remove();
		$(".list-of-suspects").append(this);
	});
}

function resetButton(){
	woopra.track('reset_southpark_game', {
		url: window.location.pathname,
		title: document.title
	});
	
	$('.tile').remove();
	var cardTemplate = $('#tile-target').html();
	characters.forEach(function(character){
		var template = _.template(cardTemplate);
		template = template({name: character, capitalizedName: capitalizeFirstLetter(character)});
		$('#characters').append(template)
	});
}