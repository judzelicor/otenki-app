import axios from "axios";

class API {
  constructor() {
    this.openweathermap_api_base_url = "https://api.openweathermap.org/data/2.5/";
    this.google_api_base_url = "https://maps.googleapis.com/maps/api/geocode/json?"
    this.openweathermap_api_key = `${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;
    this.google_api_key = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
  }


  async fetchLocationData(city) {
    try {
      const {data: {results}} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${this.google_api_key}`);

      return results[0]
    }
    catch (error) {console.log(error)}
  }

  async fetchWeatherData(lat, lng) {
    try {
      const {data} = await axios.get(`${this.openweathermap_api_base_url}onecall?lat=${lat}&lon=${lng}&appid=${this.openweathermap_api_key}`);
      return data
    }
    catch (error) {console.log(error)}
  }
}

export default API;