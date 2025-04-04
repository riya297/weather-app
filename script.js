document.addEventListener("DOMContentLoaded",function(){

    const apiKey = "6aa041a7dc524d5792c183605250104"
    const apiUrl = "https://api.weatherapi.com/v1/current.json"

    const searchBox = document.querySelector(".search-box")
    const searchButton = document.querySelector("button")

    const weatherTemp = document.querySelector(".weather-temp")
    const weatherDesc = document.querySelector(".weather-desc")
    const locationElem = document.querySelector(".location")
    const dateDayName = document.querySelector(".date-dayname")
    const dateDay = document.querySelector(".date-day")
    const humidityElem = document.querySelector(".humidity .value")
    const windElem = document.querySelector(".wind .value")
    const precipitationElem = document.querySelector(".precipitation .value")
    const weatherIcon = document.querySelector(".weather-container i")


    function fetchweather(city){
        fetch(`${apiUrl}?key=${apiKey}&q=${city}&aqi=no`)
            .then(response => response.json())
            // .then(data => console.log(data))
            .then(data => updateWeatherUI(data))
            .catch(()=>alert("City not found!"))
    }

    function updateWeatherUI(data){
        const {location,current} = data
        locationElem.textContent = location.name
        weatherTemp.textContent = `${Math.round(current.temp_c)}°C`
        weatherDesc.textContent = current.condition.text
        humidityElem.textContent = `${current.humidity}%`
        windElem.textContent = `${current.wind_kph} km/h`
        precipitationElem.textContent = `${current.precip_mm} mm`
        weatherIcon.className = getWeatherIcon(current.condition.text)
        UpdateDate();
    }

    function getWeatherIcon(condition){
        const icons = {
            "Sunny": "fa-solid fa-sun icon",
            "Partly cloudy": "fa-solid fa-cloud-sun icon",
            "Cloudy": "fa-solid fa-cloud icon",
            "Overcast": "fa-solid fa-cloud icon",
            "Mist": "fa-solid fa-smog icon",
            "Patchy rain": "fa-solid fa-cloud-rain icon",
            "Patchy snow": "fa-solid fa-snowflake icon",
            "Rain": "fa-solid fa-cloud-showers-heavy icon",
            "Snow": "fa-solid fa-snowflake icon",
            "Thunderstorm": "fa-solid fa-bolt icon"
        }
        return icons[condition] || "fa-solid fa-cloud icon"
    }

    function UpdateDate(){
        const now = new Date()
        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        dateDayName.textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
        dateDay.textContent = now.toLocaleDateString('en-US', options).split(',')[1];
        console.log(now.toLocaleDateString('en-US', options).split(',')[1])
    }

    searchButton.addEventListener('click', ()=>{
        const city = searchBox.value.trim()
        if(city)  fetchweather(city)
    })

    searchBox.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter'){
            const city = searchBox.value.trim()
            if(city)  fetchweather(city)
        }
    })

})