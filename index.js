var data = [{
    "Client": "ABC",
    "sale": "202",
    "year": "2000"
}, {
    "Client": "ABC",
    "sale": "215",
    "year": "2002"
}, {
    "Client": "ABC",
    "sale": "179",
    "year": "2004"
}, {
    "Client": "ABC",
    "sale": "199",
    "year": "2006"
}, {
    "Client": "ABC",
    "sale": "134",
    "year": "2008"
}, {
    "Client": "ABC",
    "sale": "176",
    "year": "2010"
}, {
    "Client": "XYZ",
    "sale": "100",
    "year": "2000"
}, {
    "Client": "XYZ",
    "sale": "215",
    "year": "2002"
}, {
    "Client": "XYZ",
    "sale": "179",
    "year": "2004"
}, {
    "Client": "XYZ",
    "sale": "199",
    "year": "2006"
}, {
    "Client": "XYZ",
    "sale": "134",
    "year": "2008"
}, {
    "Client": "XYZ",
    "sale": "176",
    "year": "2013"
}];

var dataGroup = d3.nest()
    .key(function(d) {
        return d.Client;
    })
    .entries(data);

var vis = d3.select("#visualisation"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
        top: 50,
        right: 70,
        bottom: 50,
        left: 100
    },
    xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
        return d.year;
    }), d3.max(data, function(d) {
        return d.year;
    })]),
    yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
        return d.sale;
    }), d3.max(data, function(d) {
        return d.sale;
    })]),
    xAxis = d3.axisBottom()
        .scale(xScale),

    yAxis = d3.axisLeft()
        .scale(yScale);

    zAxis = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
    zAxis.domain(data.map(function (c) { return c.Client; }));

vis.append("svg:g")
    .attr("class","axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);
    
vis.append("svg:g")
    .attr("class","axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

vis.append("text")             
    .attr("transform",
        "translate(" + (WIDTH/2) + " ," + 
                        (HEIGHT + MARGINS.top - 50) + ")")
    .style("text-anchor", "middle")
    .text("Year");

vis.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", MARGINS.left - 60)
    .attr("x",0 - (HEIGHT/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Sales"); 

var lineGen = d3.line()
    .x(function(d) {
      return xScale(d.year);
    })
    .y(function(d) {
      return yScale(d.sale);
    })
    .curve(d3.curveCardinal);

function color() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
}

println(zAxis);
dataGroup.forEach(function(d, i) {
    var colored = color();
    vis.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', colored)
        .attr('stroke-width', 2)
        .attr('id', 'line_'+d.key)
        .attr('fill', 'none');
    lSpace = HEIGHT/dataGroup.length;
    vis.append("text")
        .attr("x", WIDTH - 40)
        .attr("y", (lSpace / 2) + i * lSpace)
        .style("fill", "black")
        .attr("class", "legend")
        .text(d.key)
        .on('click', function() {
            var active = d.active ? false : true;
            var opacity = active ? 0 : 1;
         
            d3.select("#line_" + d.key).style("opacity", opacity);
         
            d.active = active;
        });
        var circle = vis.append("circle")
            .style("fill", colored)
            .attr("cx", WIDTH - 55)
            .attr("cy", ((lSpace / 2) + i * lSpace) - 5)
            .attr("r", 5);
});