import * as d3 from "d3";
import dataset from "./Life_expectancy_1900-2013.csv";

const line_chart = () => {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 480 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#Life_expectancy_1900-2013")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //Read the data
  d3.csv(dataset, function (d) {
    return {
      Year: d3.timeParse("%Y")(d.Year),
      "Average Life Expectancy": d["Average Life Expectancy"],
    };
  }).then(
    // Now I can use this dataset:
    function (data) {
      // Add X axis --> it is a date format
      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.Year))
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d["Average Life Expectancy"]))
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#3d405b")
        .attr("stroke-width", 2)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.Year);
            })
            .y(function (d) {
              return y(d["Average Life Expectancy"]);
            })
        );
    }
  );
};

export default line_chart;
