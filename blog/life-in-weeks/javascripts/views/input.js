myLifeVisualized.inputFromUser = function() {

    var $inputs = $('input');

    var $DOBinput = $($inputs[0]),
        $lifeExpInput = $($inputs[1]);

    function removeGraphic() {
        d3.select(".weeks").remove();
    };

    function changeGraphic(date, age) {
        removeGraphic();
        var nodes = myLifeVisualized.model.setUpModel(date, age);
        myLifeVisualized.graph.createGraphic(nodes);
    };

    function enter(){

	    $DOBinput.keypress(function(e){
	    	if (e.which == 13){
	    		var date = $DOBinput.val();
	    		var isDate = moment(date, "MM/DD/YYYY", true).isValid();
	    	}
	    });
    };

    return {

    	test: function(){
    		enter();
    		console.log('hello i am test');
    	}

    };
}();