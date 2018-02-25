var serverURL = "http://159.89.231.140/updatedmag";
var svg = d3.select("svg");
var yScale = d3.scaleLinear().domain([0, 100]).range([200, 0]);

var points = [
	{x: 0, low: 100, high: 67.5},
	{x: 750, low: 100, high: 67.5}
];
var points2 = [
	{x: 0, low: 50 , high: 100},
	{x: 750, low: 50, high: 100}
];

var areaGenerator = d3.area()
	.x(function(d) {
		return d.x;
	})
	.y0(function(d) {
		return yScale(d.low);
	})
	.y1(function(d) {
		return yScale(d.high);
	});
var area = areaGenerator(points);
var area2 = areaGenerator(points2);

var mySquare=svg.append("rect")
  .attr("x",0)
  .attr("y",2.5)
  .attr("width",60)
  .attr("height",60);
  
mySquare
  .transition()
  .attr("width",120); // will make it bigger
 
mySquare
  .style("fill","black") // if the fill is originally left blank and comes
                         //  from a style sheet, it will start as black 
  .transition()
  .style("fill","blue");
 
mySquare
  .transition()
  .style("opacity",1);
// Create a path element and set its d attribute
d3.select('g')
	.append('path')
	.attr('d',area);
d3.select('g2')
	.append('path')
	.attr('d',area2);
 
/*Request latest coordinates every second and update figure position
*
*/

setInterval(function (){
    $.get(serverURL, function(data, status){
		mySquare.transition().attr("x",data.x).attr("y", snapToRail(data.y)).duration(1000);
		//mySquare.transition().attr("y",snapToRail(data.y)).duration(1000);
    });
}, 1000);
function snapToRail(y) {
    var offset = 35;
    var index = Math.floor(y / 105);
    return offset + index * 140;
}
function inBounds(x, y){
    if(x < 0)
        return false;
    if(x > 100)
        return false;
    return true;
}



 