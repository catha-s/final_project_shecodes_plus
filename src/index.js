//  format time and date

function dateFormat(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function dayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//  forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
              <div class="col-2">
                <div class="forecast-date">${dayFormat(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  class="forecast-img"
                />
                <div class="forecast-temp">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// forecast weather data

function getForecast(coordinates) {
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

//  current weather data

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = dateFormat(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

//  city search

function search(city) {
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemperature);
}

function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

//  unit converter

//function showFahrenheit(event) {
//  event.preventDefault();
//  celsiusConversion.classList.remove("active");
//  fahrenheitConversion.classList.add("active");
//  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
//  let temperatureElement = document.querySelector("#temp");
//  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
//}

//function showCelsius(event) {
//  event.preventDefault();
//  fahrenheitConversion.classList.remove("active");
//  celsiusConversion.classList.add("active");
//  let temperatureElement = document.querySelector("#temp");
//  temperatureElement.innerHTML = Math.round(celsiusTemp);
//}

//Global variables

//let celsiusTemp = null;
//let fahrenheitTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

//let fahrenheitConversion = document.querySelector("#fahrenheit-conv");
//fahrenheitConversion.addEventListener("click", showFahrenheit);

//let celsiusConversion = document.querySelector("#celsius-conv");
//celsiusConversion.addEventListener("click", showCelsius);

search("New York");
