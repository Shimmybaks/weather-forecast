const config = {
    apiKey: "9cb72bec958f8fb02391985ed7b219d2",
    apiUrl: "https://api.openweathermap.org/data/2.5/",
};

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

async function displayForecast(response) {
    const forecast = response.data.daily;
    const forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;

    forecast.forEach((forecastDay, index) => {
        if (index < 6) {
            forecastHTML += `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
                }.png" alt="" width="42" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                )}°</span>
          </div>
        </div>
      `;
        }
    });

    forecastHTML += `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

async function getForecast(coordinates) {
    try {
        const response = await axios.get(
            `${config.apiUrl}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${config.apiKey}&units=metric`
        );
        displayForecast(response);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

async function displayTemperature(response) {
    const temperatureElement = document.querySelector("#temperature");
    const cityElement = document.querySelector("#city");
    const descriptionElement = document.querySelector("#description");
    const humidityElement = document.querySelector("#humidity");
    const windElement = document.querySelector("#wind");
    const dateElement = document.querySelector("#date");
    const iconElement = document.querySelector("#icon");

    const celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

async function search(city) {
    try {
        const response = await axios.get(
            `${config.apiUrl}/weather?q=${city}&appid=${config.apiKey}&units=metric`
        );
        displayTemperature(response);
    } catch (error) {
        console.error("City not found:", error);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

const form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Kinshasa");
