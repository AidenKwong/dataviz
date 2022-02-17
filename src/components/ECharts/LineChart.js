import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

var option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

const LineChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    var myChart = echarts.init(chartRef.current);
    option && myChart.setOption(option);
  }, []);

  return <div ref={chartRef} style={{ width: "480px", height: "480px" }} />;
};

export default LineChart;
