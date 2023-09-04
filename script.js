let city = "Paris";
const apiKey = "f13b1af28ff8657537562b7cc8d61e09";
let url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+city+"&appid="+apiKey+"";

const loc = document.querySelector ("#location")
const date = document.querySelector ("#date")
const humidity = document.querySelector (".humidity-data")
const windSpeed = document.querySelector (".wind-data")
const windDegree = document.querySelector (".wind-data-dg")
const temperature = document.querySelector ("#temperature")
const desc = document.querySelector ("#desc")
const icon = document.querySelector ("#icon")
const cityForm = document.querySelector("#city-form")

let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let format;
if(minutes < 10) {
    minutes = "0"+minutes
}
if(hours > 12 ) {
    hours = hours - 12;
    format = 'pm';
} else {
    format = 'am'
}

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const d = new Date();
let day = weekday[d.getDay()];
let dates = d.getDate();
let month = months[d.getMonth()]
let year = d.getFullYear()

date.innerHTML = `${hours} : ${minutes} ${format} | ${day} ${dates} ${month} ${year}`

let cityName = document.querySelector("#city-name");
cityForm.addEventListener("submit", function(event) {
    event.preventDefault();

    url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+cityName.value+"&appid="+apiKey+"";

    fetchWeather();

})

async function fetchWeather() {
    let response = await fetch(url);

    let data = await response.json();
    console.log(data)

    let iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    icon.setAttribute("src", iconUrl)
    loc.innerText = data.name;
    desc.innerText = data.weather[0].main ;
    temperature.innerText = data.main.temp +"°C";
   
    humidity.innerText = data.main.humidity +"%";
    windSpeed.innerText = data.wind.speed +"m/h";
    windDegree.innerText = data.wind.deg +"°";
}

fetchWeather();