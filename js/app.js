const navIcon = document.querySelector(".nav-icon");
const overlay = document.querySelector(".overlay");

const searchInput = document.getElementById("search-input");
const mobileSearchInput = document.getElementById("mobile-search-input");
const myLocationButton = document.getElementById("my-location-button");

var tempratureCF = "C";
var changeTemperature = document.getElementById("change-temperature");

$(document).ready(function () {
  navIcon.addEventListener("click", () => {
    navIcon.classList.toggle("open");
    overlay.style.height = overlay.style.height === "100%" ? "0%" : "100%";
  });

  CurrentWeather();

  searchInput.addEventListener("keydown", handleSearchInput);
  mobileSearchInput.addEventListener("keydown", handleSearchInput);
  //myLocationButton.addEventListener("click", CurrentWeather);

  
  changeTemperature.addEventListener("click", function (event) {
    let temperatures = document.getElementsByClassName("class-temperature");
    for (var i = 0; i < temperatures.length; i++) {
     let current = temperatures[i].innerHTML.split("°");
     if (tempratureCF == "C"){
      temperatures[i].innerHTML = `${Math.round(parseInt(current[0]) * 9 / 5 + 32)}°F`;
    } else {
      temperatures[i].innerHTML = `${Math.round((parseInt(current[0]) - 32) * 5 / 9)}°C`;
    }
  }

  if (tempratureCF == "C"){
    tempratureCF = "F";
  } else {
    tempratureCF = "C";

  }

});
});

function handleSearchInput(event) {
  if (event.keyCode === 13) {
    const inputCity = this.value;
    this.value = "";

    CityWeather(inputCity);
  }
}

async function CurrentWeather() {
  $("main").remove();

  const loaderDiv = $('<div class="loader-div"><div class="loading"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div></div></div>');
  $("body").append(loaderDiv);

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const validCity = await checkCity(null, latitude, longitude);

    const data = await fetchWeatherData(latitude, longitude);
    const model = new WeatherModel(data, validCity[2]);

    loaderDiv.remove();

    $("body").append(createMain(model));
  } catch (error) {
    loaderDiv.remove();
    displayErrorMessage("Permission was denied. Allow it, or just search for a city.");
  }
}

async function CityWeather(inputCity) {
  if (!inputCity || inputCity.trim() === "") {
    displayErrorMessage("Not a location, get your geography right and try again!");
    return;
  }

  const validCity = await checkCity(inputCity, null, null);

  if (!validCity) {
    displayErrorMessage("Not a location, get your geography right and try again!");
    return;
  }

  $("main").remove();

  const loaderDiv = $('<div class="loader-div"><div class="loading"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div></div></div>');
  $("body").append(loaderDiv);

  const latitude = validCity[0];
  const longitude = validCity[1];
  const fullCity = validCity[2];

  const data = await fetchWeatherData(latitude, longitude);
  const model = new WeatherModel(data, fullCity);

  $("main").remove();
  loaderDiv.remove();

  $("body").append(createMain(model));
  tempratureCF = "C";
}

function displayErrorMessage(message) {
  const popupDiv = $(`<div class="popup-div"><div class="popup-message">${message}</div><button class="close-button">X</button></div>`);
  $("body").append(popupDiv);

  $(".close-button").click(function () {
    popupDiv.remove();
  });
}
