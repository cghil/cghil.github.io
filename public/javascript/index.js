$(document).ready(function(){
	$('.project').hover(function(){
		$(this).find('.info').addClass('bluer');
	},
	function(){
		$(this).find('.info').removeClass('bluer');
	})
})

var margin = {top: 40}
var width = 960,
	height = 500;

var nodes = [{radius: 45, category:"learning", skill: "SVG"}, {radius: 45, category: "competent in", skill: "Ruby"}, {radius: 45, category: "competent in", skill:"JavaScript"},
	{radius: 45, category: "competent in", skill: "JQuery"}, {radius: 45, category: "competent in", skill: "Underscore"}, 
	{radius: 45, category: "competent in", skill: "Ajax"}, {radius: 45, category: "competent in", skill: "Git"}, {radius: 45, category: "competent in", skill: "ActiveRecord"}, 
	{radius: 45, category: "competent in", skill: "Rails"}, {radius: 45, category: "competent in", skill: "Sinatra"}, {radius: 45, category: "competent in", skill: "Rspec"}, 
	{radius: 45, category: "competent in", skill: "HTML5"}, {radius: 45, category: "competent in", skill:"CSS3"}, {radius: 45, category:"competent in", skill: "Bootstrap"}, 
	{radius: 45, category: "prior experience", skill: "STATA"}, {radius: 45, category: "competent in", skill: "SQL"}, {radius: 45, category: "competent in", skill: "PostgreSQL"}, 
	{radius: 45, category: "competent in", skill: "SQLite"}, {radius: 45, category: "competent in", skill: "Heroku"}, {radius: 45, category: "learning", skill: "Node"}, 
	{radius: 45, category: "competent in", skill: "Command Line"},{radius: 45, category: "learning", skill: "D3js"}, {radius: 45, category: "learning", skill: "Express"}, 
	{radius: 45, category: "learning", skill: "Mongoose"}, {radius: 45, category: "learning", skill: "MongoDB"}, {radius: 45, category: "learning", skill: "MongoLab"}, 
	{radius: 45, category: "learning", skill: "Backbone"}, {radius: 45, category: "prior experience", skill: "AngularJS"}, {radius: 45, category: "learning", skill: "Docker"}];

d3.shuffle(nodes)
nodes.unshift({radius: 0})

var root = nodes[0];

root.fixed = true;

var color = d3.scale.ordinal()
	.domain(["competent in", "learning", "prior experience"])
	.range(["#17becf", "#ff7f0e", "#bcbd22"]);

var force = d3.layout.force()
	.gravity(0.05)
	.charge(function(d, i){return i ? 0 : -2000;})
	.nodes(nodes)
	.size([width, height]);

force.start();

var svg = d3.select("div#viz").append("svg")
	.attr("width", width)
	.attr("height", height);

var dataNodes = svg.append('g')
	.attr("class", "nodes")
	.selectAll("circle")
	.data(nodes.slice(1))
	.enter()
	.append("g");

dataNodes.append("circle")
	.attr("class", "node")
	.attr("r", function(d){ return d.radius; })
	.style("fill", function(d, i){
		if(d.category === "learning"){
			return "#ff7f0e";
		} else if (d.category === "competent in"){
			return "#17becf";
		} else if (d.category === "prior experience"){
			return "#bcbd22";
		} else {
			return "#d62728";
		}
	});

dataNodes.append('text')
	.text(function(d){ return d.skill; })
	.attr("text-anchor", "middle");

force.on("tick", function(){
	var q = d3.geom.quadtree(nodes),
		i = 0,
		n = nodes.length;

	while (++i < n) q.visit(collide(nodes[i]));

	svg.selectAll("circle")
		.attr("cx", function(d){ return d.x; })
		.attr("cy", function(d){ return d.y; })
	svg.selectAll("text")
		.attr("dx", function(d){ return d.x; })
		.attr("dy", function(d){ return d.y; })
});
 
var legend = svg.selectAll("g.legend")
	.data(color.domain().slice())
	.enter().append('g')
		.attr('class', "legend")
		.attr('fill', "white")
		.attr("transform", function(d, i){ return "translate(0, " + i * 20 + ")"; });

legend.append('rect')
	.attr('x', width - 20)
	.attr('width', 15)
	.attr('height', 15)
	.attr("y", 20)
	.attr("fill", color);

legend.append("text")
	.attr("x", width - 24)
	.attr("y", 35)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d){ return d; });

svg.on("mousemove", function() {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}