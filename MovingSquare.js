var serverURL = "http://159.89.231.140/updatedmag";
var svg = d3.select("svg");
//var dummyData = [[95,20],[100,20],[90,20]];
var button = d3.select("#move");
var getButon = d3.select("#db");
var mySquare=svg.append("rect")
  .attr("x",60)
  .attr("y",60)
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



 