import React from "react";
import cx from "classnames";
import css from "./Weather.module.css";
import windSpeedIcon from "../../images/wind-speed-icon.svg";
import humidityIcon from "../../images/humidity-icon.svg";
import pressureIcon from "../../images/pressure-icon.svg";
import cloudsIcon from "../../images/clouds-icon.svg";
import sunsetIcon from "../../images/sunset-icon.svg";
import sunriseIcon from "../../images/sunrise-icon.svg";
import UIVIndexIcon from "../../images/uv-index-icon.svg";
import visibilityIcon from "../../images/visibility-icon.svg";

const Weather = ({weatherData : {current, timezone_offset}}) => {
  if (!current) {
    return "Loading..."
  }

  const windSpeedMagnitude = `${(current.wind_speed * 3.6).toFixed(0)} km/hr`;
  const humidityMagnitude = `${current.humidity} %`
  const pressureMagnitude = `${current.pressure} hPa`
  const cloudsMagnitude = `${current.clouds} %`;
  const sunsetTime = `${(new Date(current.sunset * 1000 + (new Date().getTimezoneOffset() * 60000) + (timezone_offset * 1000))).toLocaleTimeString('en-US', {"hour": "numeric", "minute": "2-digit"})}`
  const sunriseTime = `${(new Date(current.sunrise * 1000 + (new Date().getTimezoneOffset() * 60000) + (timezone_offset * 1000))).toLocaleTimeString('en-US', {"hour": "numeric", "minute": "2-digit"})}`;
  const uvIndex = `${Math.round(current.uvi)}`;
  const visibilityMagnitude = `${current.visibility * 0.001} km`
  return (
    <div className={css.cardsContainer}>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={windSpeedIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>Wind</span>
        <span className={css.cardData}>{windSpeedMagnitude}</span>
      </div>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={humidityIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>Humidity</span>
        <span className={css.cardData}>{humidityMagnitude}</span>
      </div>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={pressureIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>Pressure</span>
        <span className={css.cardData}>{pressureMagnitude}</span>
      </div>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={cloudsIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>Cloudiness</span>
        <span className={css.cardData}>{cloudsMagnitude}</span>
      </div>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={sunsetIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>Sunset</span>
        <span className={css.cardData}>{sunsetTime}</span>
      </div>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={sunriseIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>Sunrise</span>
        <span className={css.cardData}>{sunriseTime}</span>
      </div>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={UIVIndexIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>UV index</span>
        <span className={css.cardData}>{uvIndex}</span>
      </div>
      <div className={css.card}>
        <span className={css.cardIcon}>
          <img src={visibilityIcon} alt=""/>
        </span>
        <span className={css.cardTitle}>Visibility</span>
        <span className={css.cardData}>{visibilityMagnitude}</span>
      </div>
    </div>
  )
}

export default Weather;