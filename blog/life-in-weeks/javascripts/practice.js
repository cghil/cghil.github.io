var width = 550,
	height = 1000;

var square = 10,
	date = "03/25/1991";

var averageLifeInYears = 72;

var computeWeeksForANumberOfYears = function(value){
	var trueAnswer = value * 52.1429;
	var answer = Math.round(trueAnswer);
	return answer;
};

function compDate(year, month, day){
	var dateOne = new Date(year, month, day);
	var dateTwo = new Date();
	var numberOfWeeks = (dateTwo-dateOne)/(1000*60*60*24*7).toFixed(2);
	return Math.ceil(numberOfWeeks);
};

var averageLifeInWeeks = computeWeeksForANumberOfYears(averageLifeInYears);

var color = d3.scale.ordinal()
	.domain(["not lived", "lived"])
	.range(["#17becf", "#ff7f0e"]);

var svg = d3.select('div#viz').append('svg')
	.attr("width", width)
	.attr("height", height);

var weekData = [];

for (var weeks = 0; weeks< averageLifeInWeeks; weeks++){
	var weekObject = {category: "not lived", weekId: weeks};
	weekData.push(weekObject);
};


function xPlotter(lastDigit){
	var starter = 1;
	var starterDividedBy50 = starter/50;
	var compare = "02";

	while (lastDigit != compare){
		starter++;
		starterDividedBy50 = starter/50;
		compare = starterDividedBy50.toString();
		if(compare.length >= 4){
			compare = compare.slice(-2);
		} else if(compare.length === 3){
			compare = compare.slice(-1);
		} else {
			compare = 1;
		}
	}
	return (starter * square) + starter;
};

var weekNodes = svg.append('g')
	.attr('class', "weeks")
	.selectAll("rect")
	.data(weekData)
	.enter()
	.append('rect');

	weekNodes.attr('class', 'rectangle')
		.attr({
			id: function(d) {
				return d.weekId
			},
			width: square,
			height: square,
			x: function(d, i) {
				var weekNum = i + 1;
				var weekNumDividedBy50 = weekNum/50;
				var string = weekNumDividedBy50.toString();

				if (string.slice(-2, -1) == "." && string.length == 4) {
					var isLargeNumber = true;
				} else {
					var isLargeNumber = false;
				}

				if (string.length >= 4 && isLargeNumber===false){
					var lastDigit = string.slice(-2);
				} else if(string.length === 3 || isLargeNumber){
					var lastDigit = string.slice(-1);
				} else {
					var lastDigit = 1;
				}

				return xPlotter(lastDigit);
			},
			y: function(d, i){
				var weekNum = i + 1;
				var dividedBy75 = weekNum/75;
				dividedBy75 = Math.ceil(dividedBy75);
				return (square * dividedBy75) + dividedBy75;
			}
		})
		.style("fill", function(d){
			return color(d.category)
		});