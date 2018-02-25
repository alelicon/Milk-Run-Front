var serverURL;
var svg = d3.select("svg");
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



setInterval(function (){
    $.get(serverURL, function(data, status){
		var moveData = JSON.parse(data);
		var xMov = moveData.x;
		var yMov = moveData.y;
        alert("Data: " + moveData + "\nStatus: " + status);
		mySquare.transition().attr("x",xMov).delay(1000);
		mySquare.transition().attr("y",yMov).delay(1000);
    });
}, 1000);




  
 