const getWeather = (() => {
  function parseData(data) {
    const {
      name: cityName,
      main: { temp: temperature, feels_like: feelsLike, humidity, pressure },
      wind: { speed: windSpeed },
      weather: [{ description, icon }],
      visibility,
    } = data;
    return {
      cityName,
      temperature,
      feelsLike,
      humidity,
      windSpeed,
      pressure,
      description,
      icon,
      visibility,
    };
  }

  async function getData(city, units) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=3571205550b5e97ec7ed643f0200df9e`;
    try {
      const response = await fetch(apiUrl, { mode: "cors" });
      if (!response.ok) throw new Error(`City ${city} not found`);
      console.log(response);
      const data = parseData(await response.json());
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return { getData };
})();

export default getWeather;
