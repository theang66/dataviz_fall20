import * as d3 from "d3";
import "./index.css";

import symptomsTwoWeeks from "./data/2019/symptoms_two_weeks.csv";
import symptomsThisMonth from "./data/2019/symptoms_this_month.csv";
import symptomsThisYear from "./data/2019/symptoms_this_year.csv";
import symptomsNotThisYear from "./data/2019/symptoms_not_this_year.csv";
import symptomsNever from "./data/2019/symptoms_never.csv";

// Symptoms chart
// https://bl.ocks.org/kaijiezhou/bac86244017c850034fe
// https://observablehq.com/@uvizlab/d3-tutorial-4-bar-chart-with-transition
var chart,
  width = 200,
  height = 330;
var labelArea = 150;
var rightOffset = width + labelArea;
var lCol = "international";
var rCol = "domestic";

var xFrom = d3.scaleLinear().range([0, width]);
var xTo = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().rangeRound([20, height - 20]);

function renderSymptoms(data) {
  chart = d3
    .select(".s6Chart")
    .append("svg")
    .attr("class", "symptomsChart")
    .attr("width", labelArea + width + width + 200)
    .attr("height", height);

  var maxIntl = d3.max(data, function (d) {
    return d[lCol];
  });
  var maxDom = d3.max(data, function (d) {
    return d[rCol];
  });
  xFrom.domain([0, maxIntl]);
  xTo.domain([0, maxDom]);

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
      return width - xFrom(d[lCol]) + 80;
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
      return width - xFrom(d[lCol]) + 50;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", "20")
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr("class", "leftscore")
    .text(function (d) {
      return d[lCol] + "%";
    });

  chart
    .selectAll("text.name")
    .data(data)
    .enter()
    .append("text")
    .attr("x", labelArea / 2 + width + 80)
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
    .attr("x", rightOffset + 80)
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
      return xTo(d[rCol]) + rightOffset + 145;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr("class", "rightscore")
    .text(function (d) {
      return d[rCol] + "%";
    });

  chart
    .append("text")
    .attr("x", width / 3 + 120)
    .attr("y", 15)
    .attr("class", "title")
    .text("International");
  chart
    .append("text")
    .attr("x", width / 3 + rightOffset + 20)
    .attr("y", 15)
    .attr("class", "title")
    .text("Domestic");
  chart
    .append("text")
    .attr("x", width + labelArea / 3 + 70)
    .attr("y", 15)
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
  var maxIntl = d3.max(data, function (d) {
    return d[lCol];
  });
  var maxDom = d3.max(data, function (d) {
    return d[rCol];
  });
  xFrom.domain([0, maxIntl]);
  xTo.domain([0, maxDom]);

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
      return width - xFrom(d[lCol]) + 80;
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
    .attr("x", rightOffset + 80)
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
      return width - xFrom(d[lCol]) + 50;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", "20")
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .text(function (d) {
      return d[lCol] + "%";
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
      return xTo(d[rCol]) + rightOffset + 145;
    })
    .attr("y", function (d) {
      return y(d.symptoms) + y.bandwidth() / 2;
    })
    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .text(function (d) {
      return d[rCol] + "%";
    });
}

d3.csv(symptomsTwoWeeks, type).then(renderSymptoms);

// Symptoms buttons
var symptomsButtons = [
  {
    name: "In the last two weeks",
    data: symptomsTwoWeeks,
  },
  {
    name: "In the last 30 days",
    data: symptomsThisMonth,
  },
  {
    name: "In the last 12 months",
    data: symptomsThisYear,
  },
  {
    name: "Not in the last 12 months",
    data: symptomsNotThisYear,
  },
  {
    name: "Never",
    data: symptomsNever,
  },
];

var buttonGroup = d3
  .select(".s6Buttons")
  .append("div")
  .attr("class", "symptomsButton");

symptomsButtons.map(function (d) {
  d3.select(".symptomsButton")
    .append("input")
    .attr("type", "button")
    .attr("name", "toggle")
    .attr("value", d.name)
    .on("click", function symptomsButtonPressed() {
      d3.csv(d.data, type).then(updateBar);
    });
});
