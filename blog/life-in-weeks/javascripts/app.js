var myLifeVisualized = myLifeVisualized || {};

myLifeVisualized.svgModule = (function(){
	var width = 960,
		height = 960;

	var setSvgElement = function(){
		var svg = d3.select("div#viz").append("svg")
			.attr("width", width)
			.attr("height", height)
	}

	return {

		giveWidth: function(){
			return width;
		},

		giveHeight: function(){
			return height;
		}
	}
});