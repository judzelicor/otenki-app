import React from "react";
import css from "./app.module.css";
import Summary from "./components/Summary/Summary";
import Temperature from "./components/Temperature/Temperature";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import Weather from "./components/Weather/Weather";
import Chart from "./components/Chart/Chart";
import API from "./api/index";

const api = new API;

class App extends React.Component {
  state = {
    location: {
      city: null,
      lat: null,
      lng: null,
    },
    weatherData: {},
    temperature: {
      icon: null,
      currTemp: null,
    },
    tempMetric: "celsius"
  }

  async componentDidMount() {
    const {formatted_address, geometry : {location : {lat, lng}}} = await api.fetchLocationData("edmonton");
    this.setState({location: {city : formatted_address, lat : lat, lng : lng}});
    const weatherData = await api.fetchWeatherData(lat, lng);
    this.setState({weatherData : weatherData, temperature : {icon : weatherData.current.weather[0].icon, currTemp : weatherData.current.temp}});
  }

  changeLocation = async (searchField, location, key) => {
    if (key === 13) {
      location = location.toLowerCase();
      const {formatted_address, geometry : {location : {lat, lng}}} = await api.fetchLocationData(location);
      this.setState({location: {city : formatted_address, lat : lat, lng : lng}});
      const weatherData = await api.fetchWeatherData(lat, lng);
      this.setState({weatherData : weatherData});
      this.setState({temperature : {icon : weatherData.current.weather[0].icon, currTemp : weatherData.current.temp} })
      searchField.value = ""
    }
  }

  render() {
    return (
      <div className={css.appWindow}>
        <div className={css.appDisplay}>
          <div className={css.row}>
            <Summary weatherData={this.state.weatherData} location={this.state.location}/>
            <Temperature temperature={this.state.temperature}/>
          </div>
          <div className={css.row}>
            <DailyForecast weatherData={this.state.weatherData}/>
          </div>
          <div className={css.row}>
            <Weather weatherData={this.state.weatherData} />
            <Chart weather={this.state.weatherData} tempMetric={this.state.tempMetric}/>
          </div>

          <SearchBlock changeLocation={this.changeLocation}/>
        </div>
      </div>
    )
  }
}

export default App;