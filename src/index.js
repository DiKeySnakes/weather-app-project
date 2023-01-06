import "./styles.css";
import { format } from "date-fns";
import feelsLikeIcon from "./images/thermometer-lines.svg";
import humidityIcon from "./images/water-percent.svg";
import pressureIcon from "./images/gauge.svg";
import windIcon from "./images/windsock.svg";
import visibilityIcon from "./images/eye.svg";
import getWeather from "./getWeather";
import displayWeather from "./displayWeather";

const getDateAndTime = () => {
  const dateSpan = document.getElementById("currentDate");
  const dateObject = new Date();
  const dateDayOfWeek = format(dateObject, "EEEE");
  const dateMonth = format(dateObject, "MMMM");
  const dateDay = format(dateObject, "d");
  const dateYear = format(dateObject, "yyyy");
  const dateFormatted = `${dateDayOfWeek}, ${dateMonth} ${dateDay}, ${dateYear}`;
  dateSpan.innerHTML = dateFormatted;

  const timeSpan = document.getElementById("currentTime");
  const timeHour = format(dateObject, "h");
  const timeMinute = format(dateObject, "mm");
  const timeAmPm = format(dateObject, "a");
  const timeFormatted = `${timeHour} : ${timeMinute} ${timeAmPm.toLowerCase()}`;
  timeSpan.innerHTML = timeFormatted;
};

const iconForFeelsLike = document.getElementById("feels-like-icon");
iconForFeelsLike.src = feelsLikeIcon;

const iconForHumidity = document.getElementById("humidity-icon");
iconForHumidity.src = humidityIcon;

const iconForPressure = document.getElementById("pressure-icon");
iconForPressure.src = pressureIcon;

const iconForWind = document.getElementById("wind-icon");
iconForWind.src = windIcon;

const iconForVisibility = document.getElementById("visibility-icon");
iconForVisibility.src = visibilityIcon;

const LOCAL_STORAGE_LASTCITY = "city.lastCity";
const LOCAL_STORAGE_UNITS = "units";
let lastCity = localStorage.getItem(LOCAL_STORAGE_LASTCITY);
let units = localStorage.getItem(LOCAL_STORAGE_UNITS);

const save = () => {
  localStorage.setItem(LOCAL_STORAGE_LASTCITY, lastCity);
  localStorage.setItem(LOCAL_STORAGE_UNITS, units);
};

const unitBtn = document.getElementById("unitBtn");
unitBtn.addEventListener("click", async () => {
  if (units === "metric") {
    units = "imperial";
    unitBtn.textContent = "Display °C";
    save();
  } else {
    units = "metric";
    unitBtn.textContent = "Display °F";
    save();
  }
  const weatherData = await getWeather.getData(lastCity, units);
  displayWeather.renderWeather(weatherData, units);
  getDateAndTime();
  console.log(`LastCity is ${lastCity}`);
  console.log(`Units is ${units}`);
});

if (!units) {
  units = "metric";
  save();
  console.log(`Units is ${units}`);
}

if (!lastCity) {
  lastCity = "Kuala Lumpur";
  save();
  console.log(`LastCity is ${lastCity}`);
}
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
  if (searchInput.value.trim() === "") return;
  const weatherData = await getWeather.getData(searchInput.value.trim(), units);
  displayWeather.renderWeather(weatherData, units);
  getDateAndTime();
  lastCity = searchInput.value.trim();
  save();
  console.log(`LastCity is ${lastCity}`);
  console.log(`Units is ${units}`);
});

window.addEventListener("load", async () => {
  const weatherData = await getWeather.getData(lastCity, units);
  displayWeather.renderWeather(weatherData, units);
  if (units === "metric") {
    unitBtn.textContent = "Display °F";
  } else {
    unitBtn.textContent = "Display °C";
  }
  getDateAndTime();
});
