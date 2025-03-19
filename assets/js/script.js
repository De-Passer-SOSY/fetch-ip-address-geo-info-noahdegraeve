"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#getIp").addEventListener("click", fetchIp);
    document.querySelector("#getLocation").addEventListener("click", fetchLocation);
    console.log("de website is ingeladen");
}

async function fetchIp() {
    try {
        let response = await fetch("https://api.ipify.org/?format=json");
        let data = await response.json();
        displayIp(data);
    } catch (error) {
        console.log("fout bij het ophalen van de API voor het ip adres", error);
    }
}

async function fetchLocation() {
    try {
        let response = await fetch("https://ipinfo.io/195.130.157.67/geo");
        let data = await response.json()
        console.log(data);
        displayLocation(data);
    } catch (error) {
        console.log("fout bij het ophalen van de API voor de locatie", error);
    }
}

function displayIp(data) {
    const container = document.querySelector("#ipContainer");
    container.innerHTML = data.ip;
}

function displayLocation(data) {
    const container = document.querySelector("#locationContainer");
    container.innerHTML = data.city + " " + data.region + " " + " " +data.country + " " + data.loc;

}