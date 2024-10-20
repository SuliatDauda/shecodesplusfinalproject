function updateWeather(response) {
  console.log(response.data.temperature.current);
}

function searchCity(city) {
  let apiKey = "905390deebf4616a1a1o9903d8ct5d65";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityBox = document.querySelector("#weather-city");
  cityBox.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormBox = document.querySelector("#search-form");
searchFormBox.addEventListener("submit", handleSearchSubmit);
