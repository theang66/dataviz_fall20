import * as d3 from "d3";
import "./index.css";
import symptomsTwoWeeks from "./data/2019/symptoms_two_weeks.csv";
import symptomsThisMonth from "./data/2019/symptoms_this_month.csv";
import symptomsThisYear from "./data/2019/symptoms_this_year.csv";
import symptomsNotThisYear from "./data/2019/symptoms_not_this_year.csv";
import symptomsNever from "./data/2019/symptoms_never.csv";

// Symptoms chart
// https://bl.ocks.org/kaijiezhou/bac86244017c850034fe
var chart,
  width = 200,
  height = 240;
var labelArea = 120;
var rightOffset = width + labelArea;
var lCol = "international";
var rCol = "domestic";

var xFrom = d3.scaleLinear().range([0, width]);
var xTo = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().rangeRound([20, height]);

function renderSymptoms(data) {
  chart = d3
    .select("body")
    .append("svg")
    .attr("class", "symptomsChart")
    .attr("width", labelArea + width + width + 100)
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
      return width - xFrom(d[lCol]) + 60;
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
      return width - xFrom(d[lCol]) + 30;
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
    .attr("x", labelArea / 2 + width + 60)
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dy", ".20em")
    .attr("text-anchor", "middle")
    .attr("class", "name")
    .text(function (d) {
      return capitalize(d.symptoms);
    });

  chart
    .selectAll("rect.right")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", rightOffset + 60)
    .attr("y", yPosByIndex)
    .attr("class", "right")
    .attr("width", function (d) {
      return xTo(d[rCol]);
    })
    .attr("height", y.bandwidth());

  chart
    .selectAll("text.rightscore")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return xTo(d[rCol]) + rightOffset + 95;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr("class", "rightscore")
    .text(function (d) {
      return d[rCol];
    });

  chart
    .append("text")
    .attr("x", width / 3 + 60)
    .attr("y", 20)
    .attr("class", "title")
    .text("International");
  chart
    .append("text")
    .attr("x", width / 3 + rightOffset + 60)
    .attr("y", 20)
    .attr("class", "title")
    .text("Domestic");
  chart
    .append("text")
    .attr("x", width + labelArea / 3 + 60)
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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateBar(data) {
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
    .transition()
    .duration(800)
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("x", function (d) {
      return width - xFrom(d[lCol]) + 60;
    })
    .attr("y", yPosByIndex)
    .attr("class", "left")
    .attr("width", function (d) {
      return xFrom(d[lCol]);
    })
    .attr("height", y.bandwidth());

  chart
    .selectAll("rect.right")
    .data(data)
    .transition()
    .duration(800)
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("x", rightOffset + 60)
    .attr("y", yPosByIndex)
    .attr("class", "right")
    .attr("width", function (d) {
      return xTo(d[rCol]);
    })
    .attr("height", y.bandwidth());

  chart
    .selectAll("text.leftscore")
    .data(data)
    .transition()
    .duration(800)
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("x", function (d) {
      return width - xFrom(d[lCol]) + 30;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", "20")
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .text(function (d) {
      return d[lCol];
    });

  chart
    .selectAll("text.rightscore")
    .data(data)
    .transition()
    .duration(800)
    .delay(function (d, i) {
      return i * 100;
    })
    .attr("x", function (d) {
      return xTo(d[rCol]) + rightOffset + 95;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .text(function (d) {
      return d[rCol];
    });
}

d3.csv(symptomsTwoWeeks, type).then(renderSymptoms);

var buttonGroup = d3
  .select("body")
  .append("div")
  .attr("class", "symptomsButton");

var twoWeeksButton = d3
  .select(".symptomsButton")
  .append("input")
  .attr("type", "button")
  .attr("name", "toggle")
  .attr("value", "Two Weeks")
  .on("click", function twoWeeksPressed() {
    d3.csv(symptomsTwoWeeks, type).then(updateBar);
  });

var thisMonthButton = d3
  .select(".symptomsButton")
  .append("input")
  .attr("type", "button")
  .attr("name", "toggle")
  .attr("value", "This Month")
  .on("click", function thisMonthPressed() {
    d3.csv(symptomsThisMonth, type).then(updateBar);
  });

var thisYearButton = d3
  .select(".symptomsButton")
  .append("input")
  .attr("type", "button")
  .attr("name", "toggle")
  .attr("value", "This Year")
  .on("click", function thisYearPressed() {
    d3.csv(symptomsThisYear, type).then(updateBar);
  });

var notThisYearButton = d3
  .select(".symptomsButton")
  .append("input")
  .attr("type", "button")
  .attr("name", "toggle")
  .attr("value", "Not This Year")
  .on("click", function notThisYearPressed() {
    d3.csv(symptomsNotThisYear, type).then(updateBar);
  });

var neverButton = d3
  .select(".symptomsButton")
  .append("input")
  .attr("type", "button")
  .attr("name", "toggle")
  .attr("value", "Never")
  .on("click", function neverPressed() {
    d3.csv(symptomsNever, type).then(updateBar);
  });
