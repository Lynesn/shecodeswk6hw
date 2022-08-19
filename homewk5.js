function formatedDate(date) {
  // let dateIndex = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

// function showCurrentWeather(response) {
//   document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
//   document.querySelector("#city").innerHTML = response.data.name;
//   document.querySelector("#description").innerHTML = response.data.weather[0].main;
//   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
//   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
//   console.log(response.data);
// }

function searchCity(city){
  let apiKey = "d1c7e1c9752650fe2421481d738c5614";
  let apiUrl = `https://api.openweathermap.org.data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  // let apiKey = "d1c7e1c9752650fe2421481d738c5614";
  // let apiUrl = `https://api.openweathermap.org.data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  // axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentHumidity = Math.round(response.data.main.humidity);
  let currentWind = Math.round(response.data.wind.speed);

  let displayTemp = document.querySelector("#temp");
  displayTemp.innerHTML = `${currentTemp}`;

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${currentHumidity}%`;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `Wind: ${currentWind}km/h`;
}

function showCurrentWeather(response) {
  console.log(response.data);
  let currentLocationCity = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let currentHumidity = Math.round(response.data.main.humidity);
  let currentWind = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;

  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = `${currentLocationCity}`;

  let displayTemp = document.querySelector("#temp");
  displayTemp.innerHTML = `${currentTemp}`;

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity: ${currentHumidity}`;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `Wind: ${currentWind}`;
}

function showCurrentLocation(position) {
  let apiKey = "d1c7e1c9752650fe2421481d738c5614";
  let apiUrl = `https://api.openweathermap.org.data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentWeather);
}

// Calling location function
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function toCels(event) {
  event.preventDefault();

  let tempE = document.querySelector("#temp");
  tempE = 19;
}

function toFah(event) {
  event.preventDefault();
  let tempE = document.querySelector("#temp");
  tempE.innerHTML = 66;
}

// Calling function Current Date
let dateElement = document.querySelector("#changes");
let now = new Date();

dateElement.innerHTML = formatedDate(now);

// Calling search function
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Calling temperature functions
let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", toCels);

let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", toFah);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity("Paris");