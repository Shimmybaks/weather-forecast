function setDate(timestamp) {
    let now = new Date(timestamp);
    let hour = now.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = now.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
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
    let day = days[now.getDay()];
    return `${day} ${hour}:${minute}`;

    function displayForecast() {
        let forecastElement = document.querySelector("#forecast");


        let days = ["Thu", "Fri", "Sat", "Sun"];
        days.forEach(function (day) {
            forecastHTML =
                forecastHTML +
                `
                
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
   </div>
  `;
        });
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
        console.log(forecastHTML);
    }
}
function showTemperature(response) {
    let temperaturePart = document.querySelector("#temp");
    celsiusPart = response.data.temperature.current;
    temperaturePart.innerHTML = Math.round(celsiusPart);
    let cityPart = document.querySelector("#city");
    cityPart.innerHTML = response.data.city;
    let conditionPart = document.querySelector("#condition");
    conditionPart.innerHTML = response.data.condition.description;
    let humidityPart = document.querySelector("#humii");
    humidityPart.innerHTML = response.data.temperature.humidity;
    let windPart = document.querySelector("#speed");
    windPart.innerHTML = Math.round(response.data.wind.speed);
    let datePart = document.querySelector("#date");
    datePart.innerHTML = setDate(response.data.time * 1000);
    let iconPart = document.querySelector("#icon");
    iconPart.setAttribute(
        "src",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    iconPart.setAttribute("alt", response.data.condition.description);
}
function displaySearch(city) {
    let apiKey = "4b2293d9f6540807t7f02oa2fa78a0f9";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}
function searchForCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    displaySearch(cityInput.value);
}
function showFahrenhitTemperature(event) {
    event.preventDefault();
    let temperaturePart = document.querySelector("#temp");
    celsiusTemperature.classList.remove("active");
    fahrenhitPart.classList.add("active");
    let fahrenhitTemp = Math.round((celsiusPart * 9) / 5 + 32);
    temperaturePart.innerHTML = fahrenhitTemp;
}
function showCelsiusTemperature(event) {
    event.preventDefault();
    fahrenhitPart.classList.remove("active");
    celsiusTemperature.classList.add("active");
    let temperaturePart = document.querySelector("#temp");
    temperaturePart.innerHTML = Math.round(celsiusPart);
}
let celsiusPart = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForCity);

let fahrenhitPart = document.querySelector("#fahrenhit");
fahrenhitPart.addEventListener("click", showFahrenhitTemperature);

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", showCelsiusTemperature);

displaySearch("Kinshasa");