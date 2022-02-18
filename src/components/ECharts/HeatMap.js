import React, { useState, useRef } from "react";
import * as echarts from "echarts";
import * as d3 from "d3";
import dataFile from "./Asset_Class_Data.csv";

const HeatMap = () => {
  const chartRef = useRef();

  d3.csv(dataFile).then((data, i) => {
    const years = [...data.columns.slice(1)];
    const targets = data.map((d) => d[""]).reverse();
    const names = [];
    const output = [];
    for (var y = 0; y < data.length; y++) {
      for (var x = 0; x < data.columns.length - 1; x++) {
        output.push([
          x,
          y,
          data[data.length - y - 1][data.columns[x + 1]].replace("%", "") ||
            "-",
        ]);
      }
    }
    console.log(data, targets);

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
        type: "category",
        data: years,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: "category",
        data: targets,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: false,
        orient: "vertical",
        left: "right",
        bottom: "60%",
        inRange: {
          color: [
            "#d9ed92",
            "#b5e48c",
            "#99d98c",
            "#76c893",
            "#52b69a",
            "#34a0a4",
            "#168aad",
            "#1a759f",
            "#1e6091",
            "#184e77",
          ],
        },
      },
      series: [
        {
          type: "heatmap",
          data: output,
          label: {
            show: true,
            // formatter: (param) => {
            //   return console.log(param);
            // },
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
        width: "960px",
        height: "720px",
      }}
    />
  );
};

export default HeatMap;
