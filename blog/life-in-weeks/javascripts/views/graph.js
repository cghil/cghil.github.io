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
        var tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

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
            })
            .on("mouseover", function(d){
                var DOB = d3.select(".date").text();
                function styleToolTip(tooltip, pixel){
                    tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - pixel) + "px");
                }

                var category = d.category,
                    weekNum = parseInt(d.weekId) + 1;

                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);

                if (category=="lived"){
                    tooltip.html("Weeks Lived" + "<br>" + weekNum);
                    styleToolTip(tooltip, 38);
                } else {
                    var weeksLived = myLifeVisualized.model.currentWeeksLived(DOB);
                    var weeksUntil = weekNum - weeksLived -1;
                    tooltip.html(weeksUntil + " weeks until this point.");
                    styleToolTip(tooltip, 38);
                }
                // tooltip.html("Week" +"<br>" + (parseInt(d.weekId) + 1))
                //     .style("left", (d3.event.pageX) + "px")
                //     .style("top", (d3.event.pageY -38) + "px");
            })
            .on("mouseout", function(d){
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    };

    return {
        createGraphic: function(data) {
            var svg = createSVG();
            addWeekDataToGraph(svg, data);
        }
    };
}();