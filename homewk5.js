function formatedDate(date) {
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

  return `${day} ${hours}:${minutes}`;
}

function cityDefualtTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#humidity").innerHTML = `${Math.round(response.data.main.humidity)}`;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)}`;
  console.log(response.data);
}

function showDefaultCity(city){
  let apiKey = "d1c7e1c9752650fe2421481d738c5614";
  let apiUrl = `https://api.openweathermap.org.data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityDefualtTemp);
}

function myLocation(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");

  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "d1c7e1c9752650fe2421481d738c5614";
  let apiUrl = `https://api.openweathermap.org.data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "d1c7e1c9752650fe2421481d738c5614";
  let apiUrl = `https://api.openweathermap.org.data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

// Bonus Feature
function toCels(event) {
  event.preventDefault();

  let tempE = document.querySelector("#temp");
  let temperature = tempE.innerHTML;
  temperature = Number(temperature);
  tempE.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

function toFah(event) {
  event.preventDefault();
  let tempE = document.querySelector("#temp");
  let temperature = tempE.innerHTML;
  temperature = Number(temperature);
  tempE.innerHTML = Math.round((temperature * 9) / 5 + 32);
}


let dateElement = document.querySelector("#changes");
let now = new Date();

dateElement.innerHTML = formatedDate(now);

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", myLocation);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", toCels);

let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", toFah);

showDefaultCity("Germany");
