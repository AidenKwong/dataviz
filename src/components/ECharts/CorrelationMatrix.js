import React, { useRef } from "react";
import * as d3 from "d3";
import * as echarts from "echarts";
import dataFile from "./Correlation_Matrix_Data.csv";

const CorrelationMatrix = () => {
  const chartRef = useRef();

  d3.csv(dataFile).then((data) => {
    const yAxisLabel = [...data.columns.slice(1)].reverse();
    const xAxisLabel = [...data.columns.slice(1)];
    const output = [];
    for (var y = 0; y < yAxisLabel.length; y++) {
      for (var x = 0; x < yAxisLabel.length; x++) {
        output.push([
          y,
          x,
          +data[yAxisLabel.length - x - 1][xAxisLabel[y]] || "-",
        ]);
      }
    }
    var option = {
      tooltip: {
        position: "top",
      },
      grid: {
        height: "80%",
      },
      xAxis: {
        type: "category",
        data: xAxisLabel,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: "category",
        data: yAxisLabel,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        orient: "vertical",
        left: "right",
        bottom: "40%",
        inRange: {
          color: ["#4367A2", "#FFFFFF", "#933439"],
        },
      },
      series: [
        {
          type: "heatmap",
          data: output,
          label: {
            show: true,
            formatter: (param) => param.data[2].toFixed(2),
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

export default CorrelationMatrix;
