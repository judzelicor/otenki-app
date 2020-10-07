import React from "react";
import cx from "classnames";
import css from "./DailyForecast.module.css";

const getDay = (day, timezoneOffset) => {
 const dateObject = new Date();
  const date = new Date((day.dt * 1000) + (dateObject.getTimezoneOffset() * 60000) + (timezoneOffset * 1000));
  const days = ["Sun.", "Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat."];
  return (`${days[date.getDay()]}`)
}

const getIcon = (day) => {
  const iconLink = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
  return iconLink
}

const getTemperature = (day) => {
  const tempC = `${((day.temp.day) - 273.15).toFixed(0)} \xB0C`;
  const tempF = `${((day.temp.day - 273.15) * (9/5) + 32).toFixed(0)} \xB0F`
  return [tempC, tempF]
}

const getDescription = (day) => {
  const description = day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1);;
  return description
}

const DailyForecast = ({weatherData}) => {
  if (!weatherData.daily) {
    return "loading..."
  }

  const dailyForecast = [];

  const timezoneOffset = weatherData.timezone_offset

  for (let iterator = 1; iterator < weatherData.daily.length; iterator++) {
    dailyForecast.push(
        {
          day: getDay(weatherData.daily[iterator], timezoneOffset),
          icon: getIcon(weatherData.daily[iterator]),
          temperature: getTemperature(weatherData.daily[iterator]),
          description: getDescription(weatherData.daily[iterator])
        })
  }

  return (
    <div className={cx(css.card, css.dailyForecastCard)}>
      {dailyForecast.map((day, i) => 
      <div className={css.forecast} key={i}>
        <div className={css.day}>{day.day}</div>
        <img className={css.weatherIcon} src={`${day.icon}`} alt=""/>
        <div className={css.description}>{day.description}</div>
        <div className={css.temperature}>
          <span className={css.temperatureC}>{day.temperature[0]}</span>
          <span className={css.temperatureF}>{day.temperature[1]}</span>
        </div>
      </div>)}
    </div>
  )
}

export default DailyForecast;