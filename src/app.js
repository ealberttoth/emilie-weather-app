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
  let currentDescription = document.querySelector("#current-description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentIcon = document.querySelector("#icon");
  let h2 = document.querySelector("h2");


  celsuisTemp = response.data.main.temp;
 
  currentTemp.innerHTML = (temperature);
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  currentIcon.setAttribute("alt", response.data.weather[0].description);
  h2.innerHTML = response.data.name;
}
  

function searchCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  let units = "metric";
  let apiKey = "28c3ae709e1f96587f82b0797ade3e71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  
  h2.innerHTML = (cityInput.value);
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "28c3ae709e1f96587f82b0797ade3e71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
navigator.geolocation.getCurrentPosition(showPosition);

}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);


function showCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsuisTemp);
}

function showFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = (celsuisTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let celsuisTemp = null;

let celsiusLink = document.querySelector("#current-celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#current-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);