function updateWeather(response) {
  let cityBox = document.querySelector("#weather-city");
  let temperature = response.data.temperature.current;
  let temperatureBox = document.querySelector("#temperature");
  let descriptionBox = document.querySelector("#description");
  let humidityBox = document.querySelector("#humidity");

  cityBox.innerHTML = response.data.city;
  humidityBox.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionBox.innerHTML = response.data.condition.description;
  temperatureBox.innerHTML = Math.round(temperature);
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
