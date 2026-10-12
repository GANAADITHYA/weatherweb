let sunny=`<i class="fa-solid fa-sun"></i>`;
let rain=`<i class="fa-solid fa-cloud-rain"></i>`;
let cloud=`<i class="fa-solid fa-cloud"></i>`;
let temp=`<i class="fa-solid fa-temperature-high"></i>`;



document.querySelector(".img").innerHTML=cloud;








async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name!");

    try {
        const geoUrl = `https://open-meteo.com{encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            return alert("City not found. Please try again.");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

    
        document.getElementById('city').innerText = `${name}, ${country}`;
        document.getElementById('temp').innerText = `${weatherData.current.temperature_2m}°C`;
        
        const code = weatherData.current.weather_code;
        document.getElementById('condition').innerText = `Condition: ${weatherCodes[code] || "Unknown"}`;
        document.getElementById('wind').innerText = `Wind Speed: ${weatherData.current.wind_speed_10m} km/h`;
        
 
        document.getElementById('weatherDisplay').style.display = 'block';

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Check the console.");
    }
}