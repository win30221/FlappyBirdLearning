var rewardChart = function() {


    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatDate = d3.time.format("%d-%b-%y");

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.close);
        });

    this.svg = d3.select("#reward_chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseDate = d3.time.format("%Y-%m-%d").parse;


    this.draw = function(arrData) {
        data = arrData.map(function (d) {
            return {
                date: new Date(d[0]),
                close: d[1]
            };
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain(d3.extent(data, function (d) {
            return d.close;
        }));

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Reward");

        this.svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        function type(d) {
            d.date = formatDate.parse(d.date);
            d.close = +d.close;
            return d;
        }
    };

    this.updateData = function(arrData) {
        // console.log(arrData);
        // data = arrData.map(function (d) {
        //     return {
        //         date: new Date(d[0]),
        //         close: d[1]
        //     };
        // });
        //
        // x.domain(d3.extent(data, function (d) {
        //     return d.date;
        // }));
        // y.domain(d3.extent(data, function (d) {
        //     return d.close;
        // }));
        var svg = d3.select("#reward_chart").transition();

        // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", line(arrData));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);

    };
    this.draw([]);
};