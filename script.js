
let key = "d388dcd166e12bd431564940538e6bd2";

async function getWeatherData(cityName) {
    try {
       
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${key}`)
           if (!response.ok) {
             throw new Error("fail to fetch weather data!!")
           } 
    
        let weatherData = await response.json();
        console.log(weatherData, "data here");
        weatherUiData(weatherData)
    } catch (error) {
        console.log(error );
    }
 

}



function weatherUiData(weatherData) {
    console.log(weatherData);
    document.getElementById("cityName").innerText = weatherData.name
    document.querySelector('.deg').innerText = `${Math.round(weatherData.main.temp)}°C`
    document.getElementById("Date").innerText = new Date().toDateString();
    document.getElementById("dgree").innerHTML = `Feels Like:${(weatherData.main.feels_like)}°C` 
    
 document.getElementById("Partly").textContent = weatherData.weather[0].description;
    document.getElementById("sun").src = `${(weatherData.weather[0].main.icon)}`;  


    

    // document.getElementById("Rise").innerText = `Sunrise ${(weatherData.sys.sunrise)}`  
const sunriseUnixTimestamp = weatherData.sys.sunrise;
const sunriseDate = new Date(sunriseUnixTimestamp * 1000); 
const localHours = sunriseDate.getHours();
const localMinutes = sunriseDate.getMinutes();

const formattedSunriseTime = `${localHours}:${localMinutes} am`;
document.getElementById("Rise").innerText = `Sunrise ${formattedSunriseTime}`;
    
 

    // document.getElementById("Set").innerText = ` Sunset ${(weatherData.sys.sunset)}`
const sunsetTime = weatherData.sys.sunset;
const sunsetDate = new Date(sunsetTime* 1000); 
const Hours = sunsetDate.getHours();
const Minutes = sunsetDate.getMinutes();

const formattedSunsetTime = `${Hours}:${Minutes} pm`;
document.getElementById("Set").innerText = `Sunset ${formattedSunsetTime}`;


    
}




async function getWeeklyWeatherData(cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${key}`)
    let weeklyWeatherData = await response.json();
    console.log(weeklyWeatherData, "data here");
    weatherWeeklyUiData(weeklyWeatherData)


}



function weatherWeeklyUiData(weeklyWeatherData) {
    console.log(weeklyWeatherData, "weekly data");
   // document.getElementById("Logo1").textContent = weeklyWeatherData.list[0].weather[0].icon
  

const iconCode = weeklyWeatherData.list[0].weather[0].icon;
const iconUrl = `${iconCode}`;


const weatherIconElement = document.getElementById('Logo1')
   weatherIconElement.src = iconUrl;
  




    


     document.getElementById('heading1').innerText = `${Math.round(weeklyWeatherData.list[0].main.temp)}°`
     document.getElementById('heading2').innerText = `${Math.round(weeklyWeatherData.list[1].main.temp)}°`
     document.getElementById('heading3').innerText = `${Math.round(weeklyWeatherData.list[2].main.temp)}°`
     document.getElementById('heading4').innerText = `${Math.round(weeklyWeatherData.list[3].main.temp)}°`
     document.getElementById('heading5').innerText = `${Math.round(weeklyWeatherData.list[4].main.temp)}°`
     document.getElementById('heading6').innerText = `${Math.round(weeklyWeatherData.list[5].main.temp)}°`


     


}

const formElement = document.getElementById("form");
const inputElement = document.getElementById("enterCityName");


formElement.addEventListener('click', (e) => {
    e.preventDefault();
    const cityName = inputElement.value;
    if (!cityName == "") {
        getWeatherData(cityName);
        getWeeklyWeatherData(cityName)
        inputElement.value = "";
    }

})




