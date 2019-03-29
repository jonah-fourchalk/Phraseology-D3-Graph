var data = [{
    "name": "Jonah",
    "norm": "202",
    "date": "1999"
}, {
    "name": "Jonah",
    "norm": "215",
    "date": "2002"
}, {
    "name": "Jonah",
    "norm": "179",
    "date": "2004"
}, {
    "name": "Jonah",
    "norm": "199",
    "date": "2006"
}, {
    "name": "Jonah",
    "norm": "134",
    "date": "2008"
}, {
    "name": "Jonah",
    "norm": "176",
    "date": "2010"
}, {
    "name": "Jonah",
    "norm": "185",
    "date": "2013"
}, {
    "name": "Alishba",
    "norm": "100",
    "date": "2000"
}, {
    "name": "Alishba",
    "norm": "215",
    "date": "2002"
}, {
    "name": "Alishba",
    "norm": "179",
    "date": "2004"
}, {
    "name": "Alishba",
    "norm": "199",
    "date": "2006"
}, {
    "name": "Alishba",
    "norm": "134",
    "date": "2008"
}, {
    "name": "Alishba",
    "norm": "176",
    "date": "2013"
}];

var dataGroup = d3.nest()
    .key(function(d) {
        return d.name;
    })
    .entries(data);

var vis = d3.select("#visualisation"),
    w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    WIDTH = (w.innerWidth || e.clientWidth || g.clientWidth)*(9/10),
    HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight,
    MARGINS = {
        top: 50,
        right: 70,
        bottom: 40,
        left: 60
    },
    xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
        return d.date
;
    }), d3.max(data, function(d) {
        return d.date
;
    })]),
    yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
        return d.norm;
    }), d3.max(data, function(d) {
        return d.norm;
    })]),
    xAxis = d3.axisBottom()
        .scale(xScale),

    yAxis = d3.axisLeft()
        .scale(yScale);

vis.append("svg:g")
    .attr("class","axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom - 10) + ")")
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
    .text("Date");

vis.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", MARGINS.left - 60)
    .attr("x",0 - (HEIGHT/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Emails Normalized"); 

var lineGen = d3.line()
    .x(function(d) {
      return xScale(d.date);
    })
    .y(function(d) {
      return yScale(d.norm);
    })
    .curve(d3.curveCardinal);

    var colors = new Array(dataGroup.length);
    for (var i = 0; i < colors.length; i++) {
        colors[i] = "hsl(" + (i * (360/colors.length)) + ", 100%, 50%)";
    }

dataGroup.forEach(function(d, i) {
    var colored = colors[i];
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
            .attr("r", 7);
});
