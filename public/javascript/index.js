$(document).ready(function(){
	$('.project').hover(function(){
		$(this).find('.info').addClass('bluer');
	},
	function(){
		$(this).find('.info').removeClass('bluer');
	})
})