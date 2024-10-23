function updateWeather(response) {
  let cityBox = document.querySelector("#weather-city");
  let temperature = response.data.temperature.current;
  let temperatureBox = document.querySelector("#temperature");
  let descriptionBox = document.querySelector("#description");
  let humidityBox = document.querySelector("#humidity");
  let speedBox = document.querySelector("#wind-speed");
  let timebox = document.querySelector("#time");
  let dateBox = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let iconBox = document.querySelector("#icon");

  console.log(response.data);

  iconBox.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  dateBox.innerHTML = formatMonth(date);
  timebox.innerHTML = formatDate(date);
  speedBox.innerHTML = `${response.data.wind.speed}km/h`;
  humidityBox.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionBox.innerHTML = response.data.condition.description;
  temperatureBox.innerHTML = Math.round(temperature);

  cityBox.innerHTML = response.data.city;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatMonth(date) {
  let dates = date.getDate();
  let year = date.getFullYear();

  let months = [
    "january",
    "february",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  return `${dates} ${month} ${year}`;
}

function searchCity(city) {
  let apiKey = "905390deebf4616a1a1o9903d8ct5d65";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "905390deebf4616a1a1o9903d8ct5d65";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(displayForecast);

  let forecastBox = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div>
            <img   class="weather-forecast-icon"
            src="${day.condition.icon_url}" />
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(
                  day.temperature.maximum
                )}°</strong>              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}º</div>
            </div>
           </div>
  `;
    }
  });

  forecastBox.innerHTML = forecastHtml;
}

let searchFormBox = document.querySelector("#search-form");
searchFormBox.addEventListener("submit", handleSearchSubmit);

searchCity("Lagos");
