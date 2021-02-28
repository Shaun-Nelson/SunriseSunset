// To be used with the sunrise-sunset.org API
// Pass in destination HTML element for the sunrise time (getSunriseTime()) and the sunset time (getSunsetTime()). The SunriseSunset Object will return a time-formatted string into the element's innerHTML.

export default class SunriseSunset {
  constructor() {
    this._apiURL = "https://api.sunrise-sunset.org/json?";
  }

  async setSunrise(element) {
    const time = await this._getSunriseTime();
    document.getElementById(element).innerHTML += time;
  }

  async setSunset(element) {
    const time = await this._getSunsetTime();
    document.getElementById(element).innerHTML += time;
  }

  async _getSunriseTime() {
    const apiData = await this._getAPIData();
    return this._getFormattedTime(apiData.results.sunrise);
  }

  async _getSunsetTime() {
    const apiData = await this._getAPIData();
    return this._getFormattedTime(apiData.results.sunset);
  }

  // Returns API data in JSON format as a Promise.
  async _getAPIData() {
    try {
      const coords = await this._getCoordinates();
      const endpointURL = this._getAPIEndpointURL(coords);
      const apiData = await fetch(endpointURL)
        .then((response) => response.json())
        .catch((error) => console.log("ERROR FETCHING API DATA:", error));

      return apiData;
    } catch (err) {
      console.log("Error:", err);
    }
  }

  _getFormattedTime(time) {
    const date = new Date(time);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: "true",
    };

    return date.toLocaleString("en-US", options);
  }

  // Returns a Promise containing user's current latitude and longitude.
  _getCoordinates() {
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(res, rej);
      } else {
        alert("Geolocation not supported.");
      }
    }).catch((err) => console.log(err));
  }

  _getAPIEndpointURL(coordinates) {
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;

    return `${this._apiURL}lat=${lat}&lng=${lon}&formatted=0`;
  }
}
