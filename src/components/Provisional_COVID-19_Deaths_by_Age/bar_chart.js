import * as d3 from "d3";
import dataset from "./Provisional_COVID-19_Deaths_by_Sex_and_Age.csv";

const margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 480 - margin.left - margin.right,
  height = 480 - margin.top - margin.bottom;

const bar_chart = () => {
  const svg = d3
    .select("#Provisional_COVID-19_Deaths_by_Age")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.csv(dataset).then(function (data) {
    const subgroups = data.columns.slice(1);

    const groups = data.map((d) => d["Age Group"]);

    var color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#3d405b", "#e07a5f"]);

    var size = 16;
    svg
      .selectAll("mydots")
      .data(subgroups)
      .join("rect")

      .attr("x", 20)
      .attr("y", function (d, i) {
        return 0 + i * (size + 5);
      })
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d) {
        return color(d);
      });

    svg
      .selectAll("mylabels")
      .data(subgroups)
      .join("text")
      .attr("x", 20 + size * 1.2)
      .attr("y", function (d, i) {
        return 0 + i * (size + 5) + size / 2;
      })
      .style("fill", function (d) {
        return color(d);
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");

    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => {
          return parseInt(d.Male) + parseInt(d.Female);
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(data);

    // Show the bars
    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data["Age Group"]))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());
  });
};

export default bar_chart;
