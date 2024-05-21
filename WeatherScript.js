const apiKey = "1fc814db9be1895c0e12e7b8b2a59be9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".glass");
const icon = document.querySelector(".weatherIcon")

async function weatherSearch(city){
    const response = await fetch(apiUrl + `&q=${city}` +`&appid=${apiKey}`);
    
    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if (data.weather[0].main == "Thunderstorm"){
            icon.src = "imgs/lightning.png";
        }
    
        else if (data.weather[0].main == "Drizzle") {
            icon.src = "imgs/drizzle.png";
        }
    
        else if (data.weather[0].main == "Rain") {
            icon.src = "imgs/rain.png";
        }
        
        else if (data.weather[0].main == "Clear") {
            icon.src = "imgs/sun.png";
        }
    
        else if (data.weather[0].main == "Snow") {
            icon.src = "imgs/snow.png";
        }
    
        else if (data.weather[0].main == "Clouds") {
            if (data.weather[0].id < 803) {
                icon.src = "imgs/mixed.png";
            } else {
                icon.src = "imgs/cloud.png";
            }
        }
    
        else if (700 < data.weather[0].id < 800) {
            if (data.weather[0].main == "Mist") {
                icon.src = "imgs/mist.png";
            } else {icon.src = "imgs/hazard.png"}
        }
        
        else {icon.src = "imgs/placeholder.png"}
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


window.onload=function(){
    searchBtn.addEventListener("click", ()=>{
        weatherSearch(searchBox.value);
    })
}