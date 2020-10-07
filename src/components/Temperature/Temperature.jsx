import React from "react";
import cx from "classnames";
import css from "./Temperature.module.css"

const Temperature = ({temperature: {icon, currTemp}}) => {
  if (!icon) {
    return (
      <div className={cx(css.card, css.temperatureCard)}>
        
      </div>
    )
  }
  icon = `http://openweathermap.org/img/wn/${icon}@2x.png`
  const currTempC = `${(currTemp - 273.15).toFixed(0)} \xB0C`;
  const currTempF = `${((currTemp - 273.15) * (9/5) + 32).toFixed(0)} \xB0F`

  return (
    <div className={cx(css.card, css.temperatureCard)}>
      <img className={css.weatherIcon} src={icon} alt=""/>
      <span className={css.temp_c}>{currTempC}</span>
      <span className={css.temp_f}>{currTempF}</span>
    </div>
  )
}

export default Temperature;