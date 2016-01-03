var width = 900,
	height = 900;

var averageLifeInYears = 72;

var computeWeeksForANumberOfYears = function(value){
	var trueAnswer = value * 52.1429;
	var answer = Math.round(trueAnswer);
	return answer;
};

var averageLifeInWeeks = computeWeeksForANumberOfYears(averageLifeInYears);

var svg = d3.select('div#viz').append('svg')
	.attr("width", width)
	.attr("height", height);

var weekData = [];

for (var weeks = 0; weeks< averageLifeInWeeks; weeks++){
	var weekObject = {category: "not lived", weekId: weeks};
	weekData.push(weekObject);
};

var weekNodes = svg.append('g')
	.attr('class', "weekNode")
	.selectAll("rect")
	.data(weekData)
	.enter()
	.append("g");

weekNotes.append('rect')
	.attr('class', 'rectangle')
	// .attr('')
// for (var j=10; j<= width-10; j=j+10){
// 	svg.append("rect")
// 		.attr("width", 10)
// 		.attr('heigth')
// }

