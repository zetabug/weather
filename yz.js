window.onload = function () {
    document.getElementById("location-input").value = "";
};
document.getElementById("get-weather-button").addEventListener("click", displayData);
document.getElementById("temp").addEventListener('change',displayData );

function displayData() {
    let location = document.getElementById("location-input").value;
    let tempOption = document.getElementById("temp").value
    if(!location) return

    const apiKey = '31c12a6b9d019acd09eb297412bbf212'


    async function getData() {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
            const data = await res.json()
            console.log(data)
            const weatherDescription = data.weather[0].main;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            // Display weather information in the HTML
            const weatherInfo = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Description: ${weatherDescription}</p>
                    <p>Temperature:
                    ${tempOption=="fahrenheit"?((9.0 / 5) * (temperature - 273.15) + 32).toFixed(2) +'°F':(temperature - 273.15).toFixed(2)+'°C'}
                  
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${(windSpeed * 3.6).toFixed(2)} km/h</p>
                `;

            document.getElementById("weather-info").innerHTML = weatherInfo;

        } catch (error) {
            document.getElementById("weather-info").innerHTML = `Some Error occured!!<br>Try to enter the location again`
            console.error("Error fetching weather data:", error);
        }
    }

    getData()
}