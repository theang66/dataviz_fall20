import * as d3 from "d3";
import "./index.css";

import seekingHelpPast from "./data/2019/seeking_help_past.csv";
import seekingHelpFuture from "./data/2019/seeking_help_future.csv";

// Seeking Help chart
var chart,
  width = 600,
  height = 80;
var labelArea = 120;
var leftMargin = 50;
var xLabel = "percentage";

var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
var y = d3.scaleBand().rangeRound([20, height]);

function renderHelp(data, className) {
  var chart = d3
    .select(className)
    .append("svg")
    .attr("class", "seekingHelpChart")
    .attr("width", labelArea + width)
    .attr("height", height);

  y.domain(
    data.map(function (d) {
      return d.group;
    })
  );
  var yPosByIndex = function (d) {
    return y(d.group);
  };

  chart
    .selectAll("text.name")
    .data(data)
    .enter()
    .append("text")
    .attr("x", leftMargin)
    .attr("y", function (d) {
      return y(d.group) + y.bandwidth() / 2;
    })
    .attr("dy", ".20em")
    .attr("text-anchor", "middle")
    .attr("class", "name")
    .text(function (d) {
      return capitalize(d.group);
    });

  chart
    .selectAll("rect.help")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "help")
    .attr("x", labelArea)
    .attr("width", 0)
    .attr("y", yPosByIndex)
    .attr("height", y.bandwidth())
    .transition()
    .duration(800)
    .attr("x", labelArea)
    .attr("width", function (d) {
      return x(d[xLabel]);
    });

  chart
    .selectAll("text.rightscore")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(d[xLabel]) + labelArea + 65;
    })
    .attr("y", function (d) {
      return y(d.group) + y.bandwidth() / 2;
    })
    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr("class", "rightscore")
    .text(function (d) {
      return d[xLabel] +"%";
    });

  chart
    .append("text")
    .attr("x", labelArea + 60)
    .attr("y", 20)
    .attr("class", "title")
    .text("");
  chart
    .append("text")
    .attr("x", 25)
    .attr("y", 15)
    .attr("class", "title")
    .text("Groups");
}

function type(d) {
  return {
    group: d["group"],
    percentage: +d["percentage"],
  };
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

d3.csv(seekingHelpPast, type).then(data => renderHelp(data, "s7ChartPast"));
d3.csv(seekingHelpFuture, type).then(data => renderHelp(data, "s7ChartFuture"));