function formatDate(date){

let hours = date.getHours();
if(hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if(minutes < 10) {
  minutes = `0${minutes}`;
}
  let dayIndex = date.getDay();
  let days = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"];

  let day = days[dayIndex];
  
return `${day}, ${hours}:${minutes}`;
}

let today = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(today);


function showTemperature(response){
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#current-feels-like");
  let currentDescription = document.querySelector("#current-description");
  let currentPercipitation = document.querySelector("#percipitation");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
 
  currentTemp.innerHTML = (temperature);
  currentFeelsLike.innerHTML = (`Feels like ${feelsLike} °C`);
  currentDescription.innerHTML = response.data.weather[0].description;
  currentPercipitation.innerHTML = response.data.main.percipitation;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
}
  

function searchCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = (cityInput.value);
  let units = "metric";
  let apiKey = "28c3ae709e1f96587f82b0797ade3e71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showCurrentTemperature(response) {
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = (city);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = (temperature);
  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#current-feels-like");
  currentFeelsLike.innerHTML = (`Feels like ${feelsLike} °C`);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "28c3ae709e1f96587f82b0797ade3e71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentPosition() {
navigator.geolocation.getCurrentPosition(showPosition);

}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);