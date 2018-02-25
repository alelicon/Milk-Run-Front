var serverURL = "http://159.89.231.140/updatedmag";
var svg = d3.select("svg");
svg.append("g");

var points = [
	{x: 0, low: 70, high: 0},
	{x: 750, low: 70, high: 0}
];
var points2 = [
	{x: 0, low: 210 , high: 140},
	{x: 750, low: 210, high: 140}
];
var points3 = [
    {x: 0, low: 350 , high: 280},
    {x: 750, low: 350, high: 280}
];

var areaGenerator = d3.area()
	.x(function(d) {
		return d.x;
	})
	.y0(function(d) {
		return (d.low);
	})
	.y1(function(d) {
		return (d.high);
	});
var area = areaGenerator(points);
var area2 = areaGenerator(points2);
var area3= areaGenerator(points3);

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
var g = d3.select('g');
g.append('path')
	.attr('d',area);
g.append('path')
	.attr('d',area2);
g.append('path')
    .attr('d',area3);
 
/*Request latest coordinates every second and update figure position
*
*/

setInterval(function (){
    $.get(serverURL, function(data, status){
        var rail_y = snapToRail(data.y);
        if(rail_y > 10){
            mySquare.transition().attr("x",data.x).attr("y", rail_y).style("fill","red").duration(1000);
        }
        else{
            mySquare.transition().attr("x",data.x).attr("y", rail_y).style("fill","black").duration(1000);
        }
		//mySquare.transition().attr("y",snapToRail(data.y)).duration(1000);
    });
}, 1000);
function snapToRail(y1) {
    var y = y1 * 350 / 460;
    var offset = 5;
    var index = Math.floor(y / 105);
    return offset + index * 140;
}



 