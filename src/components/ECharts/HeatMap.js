import React, { useRef } from "react";
import * as echarts from "echarts";
import * as d3 from "d3";
import dataFile from "./Asset_Class_Data.csv";

const compare = (a, b) => {
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
};

const HeatMap = () => {
  const chartRef = useRef();

  d3.csv(dataFile).then((data) => {
    const years = [...data.columns.slice(1)];
    const groups = data.map((d) => d[""]);
    const valuesPerYear = years.map((yr) =>
      data.map((itm) => ({ id: itm[""], value: +itm[yr].replace("%", "") }))
    );
    const sortedValuesPerYear = valuesPerYear.map((d) => d.sort(compare));
    const output = [];
    for (var yr = 0; yr < years.length; yr++) {
      for (var id = 0; id < data.length; id++) {
        output.push([
          yr,
          id,
          sortedValuesPerYear[yr][id]["value"],
          sortedValuesPerYear[yr][id]["id"],
        ]);
      }
    }

    const option = {
      title: {
        top: 30,
        left: "center",
        text: "Asset Class Return",
      },
      tooltip: {
        position: "top",
      },
      grid: {
        height: "80%",
        top: "10%",
      },
      xAxis: {
        position: "top",
        type: "category",
        data: years,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        show: false,
        type: "category",
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        left: "right",
        bottom: "40%",
        type: "piecewise",
        categories: groups,
        dimension: 3,
        inRange: {
          color: [
            "#6D9CCA",
            "#B2669A",
            "#DF3E29",
            "#325184",
            "#8E9349",
            "#BBD036",
            "#E49385",
            "#553F3D",
            "#C9B498",
            "#EEEA39",
            "#F17F41",
            "#C0C0C7",
            "#51BC9F",
          ],
        },
      },
      series: [
        {
          type: "heatmap",
          data: output,
          label: {
            show: true,
            formatter: (param) => {
              return `${
                sortedValuesPerYear[param.data[0]][param.data[1]].id
              }\n${param.data[2]}%`;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    if (chartRef.current) {
      var myChart = echarts.init(chartRef.current);
      option && myChart.setOption(option);
    }
  });

  return (
    <div
      ref={chartRef}
      style={{
        border: "1px solid black",
        width: "1600px",
        height: "1024px",
      }}
    />
  );
};

export default HeatMap;
