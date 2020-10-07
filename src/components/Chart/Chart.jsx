import React from "react";
import {Line} from "react-chartjs-2";
import css from "./Chart.module.css";

const convertTemp = (kelvin, metric) => {
  switch (metric) {
    case "celsius":
      return (`${(kelvin - 273.15).toFixed(0)}`);
  }
}

const convertTime = (hour, timezoneOffset) => {
  const time = (new Date(hour * 1000));
  return (time)
}

const Chart = ({weather : {hourly, timezone_offset}, tempMetric}) => {

  if (!timezone_offset) {
    return "Loading..."
  }

  console.log(timezone_offset)

  let hourlyDataPoints = [],
      dataPoint;

  const dateToday = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (timezone_offset * 1000)).getDate();

  for (let hour in hourly) {
    const date = new Date((hourly[hour].dt * 1000)).getDate();
    if (date === dateToday) {
      dataPoint = {
        x: convertTime(hourly[hour].dt, timezone_offset),
        y: convertTemp(hourly[hour].temp, tempMetric)
      }
      console.log(dataPoint)
      hourlyDataPoints.push(dataPoint)
    }
  }
  console.log(hourlyDataPoints)
  const lineChart = (
  hourlyDataPoints.length ? 
  <Line 
    data={{
        datasets: [
          {
            label: false,
            data: hourlyDataPoints,
            fill: true,
            backgroundColor: "rgba(236,110,76,0.40)",
            borderColor: '#EC6E4C',
            pointRadius: 0,
            borderWidth: 3
          }
        ]
    }}
    options={{
      legend: {display: false}, 
      responsive: true,
      maintainAspectRatio: true,
      tooltips: {mode: 'index', intersect: false},
      scales: {xAxes: [{ gridLines: false, type: "time", time: {unit: "hour"}, ticks: {fontColor: "#f5f5f5", padding: 14}}], yAxes: [{gridLines: false, ticks: {fontColor: "#f5f5f5", padding: 14}, afterTickToLabelConversion : function(q){
        for(var tick in q.ticks){
            q.ticks[tick] += ' \u00B0C';
        }
    }}]}
      }}
  /> : null
);

  return (
    <div className={css.chartContainer}>
      {lineChart}
    </div>
  )
}

export default Chart;