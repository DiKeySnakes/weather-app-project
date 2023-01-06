const displayWeather = (() => {
  function renderWeather(weatherData, units) {
    if (!weatherData) return;

    const weatherCard = document.getElementById("weatherCard");
    weatherCard.classList.add("active");

    const cityName = document.getElementById("cityName");
    const icon = document.getElementById("weather-icon");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const feelsLike = document.getElementById("feelsLike");
    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const wind = document.getElementById("wind");
    const visibility = document.getElementById("visibility");

    cityName.textContent = `Weather in ${weatherData.cityName}`;
    icon.src = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
    let tempUnit;
    if (units === "metric") {
      tempUnit = "°C";
    } else {
      tempUnit = "°F";
    }
    temperature.textContent = `${Math.round(
      weatherData.temperature
    )} ${tempUnit}`;
    description.textContent = weatherData.description;
    feelsLike.textContent = `Feels like: ${Math.round(
      weatherData.feelsLike
    )} ${tempUnit}`;
    humidity.textContent = `Humidity: ${weatherData.humidity} %`;
    pressure.textContent = `Pressure: ${weatherData.pressure} hPa`;
    let windSpeedUnit;
    if (units === "metric") {
      windSpeedUnit = "meter/sec";
    } else {
      windSpeedUnit = "miles/hour";
    }
    wind.textContent = `Wind: ${Math.round(
      weatherData.windSpeed
    )} ${windSpeedUnit}`;
    visibility.textContent = `Visibility: ${weatherData.visibility} meters`;
  }

  return { renderWeather };
})();

export default displayWeather;
