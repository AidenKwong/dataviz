import dataset from "./Quality_of_Life_Index_by_Purchasing_Power_Index.csv";
import * as d3 from "d3";

const scatter_plot = () => {
  // set the dimensions and margins of the graph
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 480 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#Quality_of_Life_Index_by_Purchasing_Power_Index")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Read the data
  d3.csv(dataset).then(function (data) {
    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => parseFloat(d["Quality of Life Index"]))])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => parseFloat(d["Purchasing Power Index"]))])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x(d["Quality of Life Index"]);
      })
      .attr("cy", function (d) {
        return y(d["Purchasing Power Index"]);
      })
      .attr("r", 4)
      .style("fill", "#3d405b")
      .style("opacity", 0.75);

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Quality of Life Index");

    // Y axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top)
      .text("Purchasing Power Index");
  });
};

export default scatter_plot;
