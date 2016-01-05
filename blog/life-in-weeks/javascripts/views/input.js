myLifeVisualized.inputFromUser = function() {

    var $inputs = $('input');

    var $DOBinput = $($inputs[0]),
        $lifeExpInput = $($inputs[1]);

    function removeGraphic() {
        d3.select("svg").remove();
    };

    function changeGraphic(date, age) {
        removeGraphic();
        var age = parseInt(age);
        changeText(date, age);
        var nodes = myLifeVisualized.model.setUpModel(date, age);
        myLifeVisualized.graph.createGraphic(nodes);
    };

    function checkIfNumBetween50and95(string) {
        var num = parseInt(string);
        if (isNaN(num) === true || num < 50 || num > 95) {
            return false;
        } else {
            return true;
        }
    };

    function checkIfDateIsDate(date) {
        var isDate = moment(date, "MM/DD/YYYY", true).isValid();
        return isDate;
    };

    function changeText(date, age) {
        $('span.expectancy').text(age);
        $('span.date').text(date);
    };

    function enter() {
        $(document).ready(function() {

            $DOBinput.keypress(function(e) {
                if (e.which == 13) {
                    e.preventDefault();
                    var date = $DOBinput.val().trim();
                    var age = $lifeExpInput.val().trim();
                    console.log(age)
                    if (checkIfDateIsDate(date)) {
                        if (checkIfNumBetween50and95(age)) {
                            changeGraphic(date, age);
                        } else {
                            changeGraphic(date, 72);
                        }
                    }
                }
            });

            $lifeExpInput.keypress(function(e) {
                if (e.which == 13) {
                    e.preventDefault();
                    var age = $lifeExpInput.val().trim();
                    var date = $DOBinput.val().trim();
                    if (checkIfNumBetween50and95(age)) {
                        if (checkIfDateIsDate(date)) {
                            changeGraphic(date, age);
                        } else {
                            date = $('span.date').text();
                            changeGraphic(date, age);
                        }
                    }
                }
            });
        });
    };

    return {

        test: function() {
            enter();
            console.log('hello i am test');
        }

    };
}();