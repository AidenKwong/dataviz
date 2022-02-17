import React, { useState, useRef } from "react";
import * as echarts from "echarts";
import * as d3 from "d3";
import dataFile from "./Asset_Class_Data.csv";

const HeatMap = () => {
  var chartRef = useRef();
  var years = [];
  const groups = [];
  const output = [];
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
      height: "50%",
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
      data: groups,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
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
          formatter: (param) => {
            return param.data[2] + " %";
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

  d3.csv(dataFile).then((data, i) => {
    for (var y = 0; y < data.length - 1; y++) {
      groups.push(data[data.length - y - 2][""]);
      years.push(data.columns.slice(1)[y]);
      for (var x = 0; x < data.columns.length - 1; x++) {
        output.push([
          x,
          y,
          +data[data.length - y - 2][data.columns[x + 1]].replace("%", "") ||
            "-",
        ]);
      }
    }
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
        height: "960px",
      }}
    />
  );
};

export default HeatMap;
