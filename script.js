const inputBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const errorMessage = document.querySelector('.error');
const apiKey = "74b681bc27ac240ecbf5ba639e7372d1"

async function checkWeather(city) {
    try {
      const  apiKey = '74b681bc27ac240ecbf5ba639e7372d1';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
         throw new Error('Ciudad no encontrada')
     }

     const data = await response.json();

     console.log(data);

     updateWeatherUI(data);

     } catch (error) {
        console.error(error.message);
        weather.computedStyleMap.display = 'none';
        errorMensage.style.display = 'block';
     }

}  
function updateWeatherUI(data) {
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed}km/h`;

    const weatherIcons = {
        Clear:'images/clear.png',
        Snow:'images/snow.png',
        Rain:'images/rain.png',
        Clouds:'images/clouds.png'
    }

    weather.src = weatherIcons[data.weather[0].main] || 'images/rain.png';
    
    weather.style.display = 'block';
    errorMensage.display = 'none';
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})
