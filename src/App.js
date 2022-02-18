import "./App.css";
import { useEffect } from "react";
import bar_chart from "./components/Provisional_COVID-19_Deaths_by_Age/bar_chart";
import scatter_plot from "./components/Quality_of_Life_Index_by_Purchasing_Power_Index/scatter_plot";
import line_chart from "./components/Life_expectancy_1900-2013/line_chart";
import LineChart from "./components/ECharts/LineChart";
import ScatterPlot from "./components/ECharts/ScatterPlot";
import HeatMap from "./components/ECharts/HeatMap";

function App() {
  useEffect(() => {
    bar_chart();
    scatter_plot();
    line_chart();
  }, []);

  return (
    <div className="App">
      <h1>Dataviz</h1>
      <div className="viz">
        Provisional COVID-19 Deaths by Age in U.S (by 1/29/2022)
        <div id="Provisional_COVID-19_Deaths_by_Age" />
      </div>
      <div className="viz">
        Quality of Life Index by Purchasing Power Index
        <div id="Quality_of_Life_Index_by_Purchasing_Power_Index" />
      </div>
      <div className="viz">
        Life Expectancy (1900-2013)
        <div id="Life_expectancy_1900-2013" />
      </div>
      <LineChart />
      <HeatMap />
      <ScatterPlot />
    </div>
  );
}

export default App;
