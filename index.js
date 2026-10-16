let sunny=`<i class="fa-solid fa-sun"></i>`;
let rain=`<i class="fa-solid fa-cloud-rain"></i>`;
let cloud=`<i class="fa-solid fa-cloud"></i>`;
let temp=`<i class="fa-solid fa-temperature-high"></i>`;

async function getWeather() {
    // 1. Get the city name from your input element
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Please enter a city name! (Try typing: Mysuru)");

    try {
        // 2. Fetch the latitude and longitude from the correct Geocoding endpoint
        // FIXED: Added 'geocoding-api.' subdomain, added '/v1/search?name=', and added the missing '\$' sign
        const geoUrl = `https://open-meteo.com{encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        // Safety Check: Make sure the API actually found the city
        if (!geoData.results || geoData.results.length === 0) {
            return alert("City not found. Please try again.");
        }

        // Extracting data out of the first array element [0]
        const targetCity = geoData.results[0]; 
        const lat = targetCity.latitude;
        const lon = targetCity.longitude;

        // 3. Fetch the weather data using the coordinates we just extracted
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // 4. Update your HTML elements with the data
        document.getElementById('city').innerText = `${targetCity.name}, ${targetCity.country}`;
        document.getElementById('temp').innerText = `${weatherData.current.temperature_2m}°C`;
        document.getElementById('wind').innerText = `Wind Speed: ${weatherData.current.wind_speed_10m} km/h`;

    } catch (error) {
        console.error("Fetch operation failed:", error);
        alert("Something went wrong. Check your internet or browser console.");
    }
}


let a=document.querySelector("#temp");
if(a.innerText>30)
{
    $(`body`).css("background-color","#ff640a ");
     $(`.contianer`).css("background-color","#e8690f");
     document.querySelector(".img").innerHTML=sunny;
}
else if(a.innerText<=30)
{
    $(`body`).css("background-color","#2ccef3 ");
     $(`.contianer`).css("background-color","#0cdcf39e");
     document.querySelector(".img").innerHTML=cloud;
}