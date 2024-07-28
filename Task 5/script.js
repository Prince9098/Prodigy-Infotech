const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

async function fetchWeatherData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayWeatherData(data);
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
}

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
        fetchWeatherData(url);
    } else {
        alert('Please enter a location');
    }
}

function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            fetchWeatherData(url);
        }, error => {
            alert('Error fetching location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}
