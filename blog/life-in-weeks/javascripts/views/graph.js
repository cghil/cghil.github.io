myLifeVisualized.graph = function() {

    var width = 410,
        height = 825,
        square = 7;

    var createSVG = function() {

        var svg = d3.select('div#viz')
            .append('svg')
            .attr("width", width)
            .attr('height', height);

        return svg;
    };

    var color = d3.scale.ordinal()
        .domain(["not lived", "lived"])
        .range(["#d3d3d3", "#17becf"]);

    function xPlotter(lastDigit) {
        var starter = 1;
        var starterDividedBy50 = starter / 50;
        var compare = "02";

        while (lastDigit != compare) {
            starter++;
            starterDividedBy50 = starter / 50;
            compare = starterDividedBy50.toString();
            if (compare.length >= 4) {
                compare = compare.slice(-2);
            } else if (compare.length === 3) {
                compare = compare.slice(-1);
            }
        }
        return (starter * square) + starter;
    };

    function addWeekDataToGraph(svg, data) {
        var weekRects = svg.append('g')
            .attr('class', 'weeks')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect');

        weekRects.attr('class', 'rectangle')
            .attr({
                id: function(d) {
                    return d.weekId;
                },
                width: square,
                height: square,
                x: function(d, i) {
                    var weekNum = i + 1;
                    var weekNumDividedBy50 = weekNum / 50;
                    var string = weekNumDividedBy50.toString();

                    if (string.slice(-2, -1) == "." && string.length == 4) {
                        var isLargeNumber = true;
                    } else {
                        var isLargeNumber = false;
                    }

                    if (weekNumDividedBy50 == Math.round(weekNumDividedBy50)) {
                        var lastDigit = 1;
                        return 400;
                    } else {
                        if (string.length >= 4 && isLargeNumber === false) {
                            var lastDigit = string.slice(-2);
                        } else if (string.length === 3 || isLargeNumber) {
                            var lastDigit = string.slice(-1);
                        } else {
                            var lastDigit = 1;
                        }
                        return xPlotter(lastDigit);
                    }
                },
                y: function(d, i) {
                    var weekNum = i + 1;
                    var dividedBy50 = weekNum / 50;
                    var y = (square * dividedBy50) + dividedBy50;
                    var point = y/8
                    point = Math.ceil(point);
                    return (point * square) + point ;
                }
            })
            .style('fill', function(d) {
                return color(d.category);
            })
            .attr('category', function(d) {
                return d.category;
            });
    };

    return {
        createGraphic: function(data) {
            var svg = createSVG();
            addWeekDataToGraph(svg, data);
        }
    };
}();