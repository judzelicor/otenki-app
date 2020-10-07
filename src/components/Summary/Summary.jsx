import React from "react";
import cx from "classnames";
import css from "./Summary.module.css"

const getDatexTime = (timezoneOffset) => {
  const dateObject = new Date();
  const date = new Date((dateObject.getTime()) + (dateObject.getTimezoneOffset() * 60000) + (timezoneOffset * 1000));
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return (`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`)
}

const Summary = ({location, weatherData}) => {
  if (!weatherData.current) {
    return (
      <div className={cx(css.card, css.summaryCard)}>
        -
      </div>
    )
  }

  let advisoryMessage;

  if (weatherData.alerts === undefined) {
    advisoryMessage = "There are currently no urgent weather alerts from the government. Wear your masks and stay well."
  }

  const timezoneOffset = weatherData.timezone_offset;
  const description = weatherData.current.weather[0].description.charAt(0).toUpperCase() + weatherData.current.weather[0].description.slice(1);

  return (
    <div className={cx(css.card, css.summaryCard)}>
      <h2 className={css.cardLocation}>{location.city}</h2>
      <div className={css.cardDatexTime}>{getDatexTime(timezoneOffset)}</div>
      <div className={css.container}>
        <span className={css.cardWeatherDescription}>{description}</span>
        <span className={css.cardAdvisory}>
          <span className={css.advisory}>{advisoryMessage}</span>
        </span>
      </div>
    </div>
  )
}

export default Summary;