var myLifeVisualized = myLifeVisualized || {};

myLifeVisualized.model = function(){
	
	var computeLifeLengthInWeeks = function(year){
		var trueAnswer = year * 52.1429;
		var answer = Math.round(trueAnswer);
		return answer;
	};

	var currentWeeksLived = function(year, month, day){
		var dateOne = new Date(year, month, day),
			dateTwo = new Date(),
			numberOfWeeks = (dateTwo-dateOne)/(1000*60*60*24*7).toFixed(2);

		return Math.ceil(numberOfWeeks);
	};

	var computeWeekData = function(date, lifeLengthInWeeks){

		var year = date.slice(-4),
			month = date.slice(0,2),
			day = date.slice(3, 5);

		var weeksLived = currentWeeksLived(year, month, day);
		
		var percentageOfLifeLived = (weeksLived/lifeLengthInWeeks) * 100;

		var weekData = [];

		for(var week=0; week < lifeLengthInWeeks; week++){
			var weekObject = {weekId: week};
			if(week <= weeksLived){
				weekObject.category = "lived";
			} else {
				weekObject.category = "not lived";
			}
			weekData.push(weekObject);
		};

		return { 
			data: weekData,
			percentageOfLife: percentageOfLifeLived
		};
	};

	return {
		setUpModel: function(DOB, lifeExpectancy){
			var lifeExpInWeeks = computeLifeLengthInWeeks(lifeExpectancy);
			var information = computeWeekData(DOB, lifeExpInWeeks);
			return {
				data: information.data,
				percentage: information.percentageOfLife
			};
		},
		currentWeeksLived: function(date){
			var year = date.slice(-4),
				month = date.slice(0,2),
				day = date.slice(3, 5);
			return currentWeeksLived(year, month, day);
		}
	};

}();