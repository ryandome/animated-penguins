var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
function(penguins)
    {
        setup(penguins,0);
        
        console.log("works",penguins);
    },
function(err)
    {
        console.log("no penguins",err);
    }
)


var getGrade = function(quiz)
    {
        return quiz.grade
    }


var screen = {width:800,height:800}
var margins = {top:10,right:50,bottom:50,left:50}


var setup = function(penguins)
{
    d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        .append("g")
        .attr("id","graph")
        .attr("transform","translate("+margins.left+","+margins.top+")");
    
    
    var width = screen.width - margins.left -margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                    .domain([0,38])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([height,0])
    
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
        .append("g")
        .classed("axis",true);
    
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","+(margins.top+height) +")")
        .call(xAxis)
    
        
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform", "translate(25, "+margins.top+")")
        .call(yAxis)
    
    
    
    d3.select("#graph")
        .selectAll("circle")
        .data(penguins[0].quizes)
        .enter()
        .append("circle")
        

    
    
    
    d3.select("#divB")
        .selectAll("img")
        .data(penguins)//[index].quizes)
        .enter()
        .append("img")
        .attr("src",function(penguin){return "penguins/" + penguin.picture})
        /*.text(function(p)
            {
                return "penguin" //+ p.day
            }) */
        .on("click", function(penguin,index)
                    {
                        //d3.selectAll("circle").remove();
                        console.log(index)
                        return drawArray(penguins,xScale,yScale,index)
                    })
    
    
    //drawArray(penguins,xScale,yScale,0)
}


var drawArray = function(penguins,xScale,yScale,index)
{
    var arrays = d3.select("#graph")
            .selectAll("circle")
            .data(penguins[index].quizes)
            .transition()
            .duration(2000)
            .attr("id","circleTooltip")
            .attr("fill",function(p)
                {
                    return "red";
                })
            .attr("cx",function(num,index)
                {
                    return xScale(index);
                })
            .attr("cy",function(num)
                {
                    return yScale(num.grade);
                })
            .attr("r",7)
    
    
    

   /* var tooltip = d3.select("#graph")
                    .append("div")
                    .style("position","absolute")
                    .style("z-index", "10")
                    .style("visibility","hidden")
                    .style("background", "#000")
                    .text("grade")*/
    
   /* var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#000")
    .text("a simple tooltip"); */
    
    
 /*  d3.select("#circleTooltip")
        .on("mouseover", function() {return                 tooltip.style("visibilty","visible");})
        .on("mouseout",function() {return tooltip.style("visibility", "hidden");})
         .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-20)+"px").style("left",(d3.event.pageX+20)+"px");})*/
    
 /*  d3.select("#circleTooltip")
  .selectAll("div")
    .data(penguins)
  .enter().append("div")
    .style("width", 15)
    .text("word")
    .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-20)+"px").style("left",(d3.event.pageX+20)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});*/
            
}













