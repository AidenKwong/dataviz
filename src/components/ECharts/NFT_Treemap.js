import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import * as d3 from "d3";
import dataFile from "../../datasets/listing-1645740909404.json";

const NFT_Treemap = () => {
  const chartRef = useRef();

  //data reform
  const NFTRawList = [...dataFile.data.list];

  const tagsMap = new Map();

  NFTRawList.map((itm) =>
    itm.tags.map((tag) => {
      !tagsMap.get(tag)
        ? tagsMap.set(tag, 1)
        : tagsMap.set(tag, tagsMap.get(tag) + 1);
    })
  );

  const tagsMapSorted = [...tagsMap.entries()].sort((a, b) => b[1] - a[1]);
  const tagNames = tagsMapSorted.map((itm) => itm[0]);

  const output = tagsMapSorted.map((tag) => {
    return {
      name: tag[0],
      children: [],
    };
  });

  for (var i = 0; i < output.length; i++) {
    for (var j = 0; j < NFTRawList.length; j++) {
      NFTRawList[j].tags.sort((a, b) => tagsMap.get(b) - tagsMap.get(a));

      if (NFTRawList[j].tags[0] == output[i].name) {
        output[i].children.push({
          name: NFTRawList[j].name,
          value: NFTRawList[j].marketCap,
        });
      }
    }
  }

  // NFTRawList.map((nft) => nft.tags.length > 1 && console.log(nft.tags));
  function getLevelOption() {
    return [
      {
        itemStyle: {
          borderColor: "#777",
          borderWidth: 0,
          gapWidth: 1,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        itemStyle: {
          borderColor: "#555",
          borderWidth: 5,
          gapWidth: 1,
        },
        emphasis: {
          itemStyle: {
            borderColor: "#ddd",
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6,
        },
      },
    ];
  }

  useEffect(() => {
    var option = {
      title: {
        text: "Disk Usage",
        left: "center",
      },
      tooltip: {},
      series: [
        {
          name: "category",
          type: "treemap",
          visibleMin: 300,
          label: {
            show: true,
            formatter: "{b}",
          },
          upperLabel: {
            show: true,
            height: 30,
          },
          itemStyle: {
            borderColor: "#fff",
          },
          levels: getLevelOption(),
          data: output,
        },
      ],
    };

    var myChart = echarts.init(chartRef.current);

    option && myChart.setOption(option);
  }, []);

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

export default NFT_Treemap;
