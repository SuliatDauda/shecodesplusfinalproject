function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityBox = document.querySelector("#weather-city");
  cityBox.innerHTML = searchInput.value;
}

let searchFormBox = document.querySelector("#search-form");
searchFormBox.addEventListener("submit", handleSearchSubmit);
