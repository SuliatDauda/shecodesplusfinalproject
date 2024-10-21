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

let searchFormBox = document.querySelector("#search-form");
searchFormBox.addEventListener("submit", handleSearchSubmit);

searchCity("Lagos");
