import * as d3 from "d3";
import "./index.css";
import symptomsTwoWeeks from "./data/2019/symptoms_two_weeks.csv";

// Symptoms chart
// https://bl.ocks.org/kaijiezhou/bac86244017c850034fe
var labelArea = 160;
var chart,
  width = 100,
  bar_height = 20,
  height = bar_height * 10;
var rightOffset = width + labelArea;

var lCol = "international";
var rCol = "domestic";
var xFrom = d3.scaleLinear().range([0, width]);
var xTo = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().rangeRound([20, height]);

function render(data) {
  var chart = d3
    .select("body")
    .append("svg")
    .attr("class", "chart")
    .attr("width", labelArea + width + width)
    .attr("height", height);

  xFrom.domain(
    d3.extent(data, function (d) {
      return d[lCol];
    })
  );
  xTo.domain(
    d3.extent(data, function (d) {
      return d[rCol];
    })
  );

  y.domain(
    data.map(function (d) {
      return d.symptoms;
    })
  );
  var yPosByIndex = function (d) {
    return y(d.symptoms);
  };

  chart
    .selectAll("rect.left")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return width - xFrom(d[lCol]);
    })
    .attr("y", yPosByIndex)
    .attr("class", "left")
    .attr("width", function (d) {
      return xFrom(d[lCol]);
    })
    .attr("height", y.bandwidth());

  chart
    .selectAll("text.leftscore")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return width - xFrom(d[lCol]) - 40;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", "20")
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr("class", "leftscore")
    .text(function (d) {
      return d[lCol];
    });

  chart
    .selectAll("text.name")
    .data(data)
    .enter()
    .append("text")
    .attr("x", labelArea / 2 + width)
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dy", ".20em")
    .attr("text-anchor", "middle")
    .attr("class", "name")
    .text(function (d) {
      return d.symptoms;
    });

  chart
    .selectAll("rect.right")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", rightOffset)
    .attr("y", yPosByIndex)
    .attr("class", "right")
    .attr("width", function (d) {
      return xTo(d[rCol]);
    })
    .attr("height", y.bandwidth());

  chart
    .selectAll("text.score")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return xTo(d[rCol]) + rightOffset + 40;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr("class", "score")
    .text(function (d) {
      return d[rCol];
    });

  chart
    .append("text")
    .attr("x", width / 3)
    .attr("y", 20)
    .attr("class", "title")
    .text("International");
  chart
    .append("text")
    .attr("x", width / 3 + rightOffset)
    .attr("y", 20)
    .attr("class", "title")
    .text("Domestic");
  chart
    .append("text")
    .attr("x", width + labelArea / 3)
    .attr("y", 20)
    .attr("class", "title")
    .text("Symptoms");
}

function type(d) {
  return {
    domestic: +d["domestic"],
    international: +d["international"],
    symptoms: d.symptoms,
  };
}

d3.csv(symptomsTwoWeeks, type).then(render);
