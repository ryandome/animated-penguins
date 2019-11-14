var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
function(penguins)
    {
        setup(penguins);
        
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


var setup = function(penguins,index)
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
        .selectAll("button")
        .data(penguins)
        .enter()
        .append("button")
        .append("img")
        .attr("src",function(p)
            {
                return "penguins/" + p.picture
            })
        
    
      .on("click", function(p)
                    {
                        d3.selectAll("circle")
                        .remove();
                        return drawArray(penguins,xScale,yScale,p.grade)
                    })
    
    
    //drawArray(penguins,xScale,yScale,0)
}


var drawArray = function(penguins,xScale,yScale,index)
{
    var arrays = d3.select("#graph")
            .selectAll("circle")
            .data(penguins[index].quizes)
            .attr("fill",function(p)
                {
                    return "black";
                })
            .attr("cx",function(num,index)
                {
                    return xScale(index);
                })
            .attr("cy",function(num)
                {
                    return yScale(num.grade);
                })
            .attr("r",3)
}













