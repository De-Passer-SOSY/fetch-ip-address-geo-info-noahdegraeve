"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#getIp").addEventListener("click", fetchIp);

    console.log("de website is ingeladen");
}

async function fetchIp() {
    try {
        let response = await fetch("https://api.ipify.org/?format=json");
        let data = await response.json();
        displayIp(data);
        fetchLocation(data.ip)
    } catch (error) {
        console.log("fout bij het ophalen van de API voor het ip adres", error);
    }
}

async function fetchLocation(ip) {
    try {
        let response = await fetch(`https://ipinfo.io/${ip}/geo`);
        let data = await response.json()
        console.log(data);
        displayLocation(data);
        fetchCoords(data.city, data.region)
    } catch (error) {
        console.log("fout bij het ophalen van de API voor de locatie", error);
    }
}

async function fetchCoords(city, region){
    try{
        let response = await fetch(`https://nominatim.openstreetmap.org/search?q={${city},${region}}&format=json`);
        let data = await response.json();
        console.log(data);
        let latitude =data[0].lat
        let longitude =data[0].lon
        console.log(latitude, longitude)
        displaycoords(latitude, longitude)
        fetchWeather(latitude, longitude)
    } catch (error) {
        console.log("fout bij het ophalen van de API",error);
    }
}

async function fetchWeather(latitude, longitude){
    try{
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,rain&forecast_days=1`)
        let data = await response.json();
        console.log(data);
        const temperature = data.current.temperature_2m
        const wind = data.current.wind_speed_10m
        const rain =data.current.rain
        console.log(temperature,wind, rain)
        displayWeather(temperature, wind, rain)
    } catch (error) {
        console.log("fout bij het ophalen van de API",error);
    }
}


function displayIp(data) {
    const container = document.querySelector("#ipContainer");
    container.innerHTML = data.ip;
}

function displayLocation(data) {
    const container = document.querySelector("#locationContainer");
    container.innerHTML = data.city + "," + data.region + "," + data.country

}

function displaycoords(latitude, longitude) {
    const container = document.querySelector("#coordsContainer");
    container.innerHTML = latitude + "," + longitude;
}

function displayWeather(temperature, rain, wind) {
    const container = document.querySelector("#weatherContainer");
    container.innerHTML = "temperatuur " + temperature + " °C, regen " + rain + " mm, wind " + wind +" km/h";
}


