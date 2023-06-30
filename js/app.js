const navIcon = document.querySelector(".nav-icon");
const overlay = document.querySelector(".overlay");

var searchInput = document.getElementById("search-input");
var mobileSearchInput = document.getElementById("mobile-search-input");
var myLocationButton = document.getElementById("my-location-button");

$(document).ready(function () {
  navIcon.addEventListener("click", () => {
    navIcon.classList.toggle("open");
    if (overlay.style.height === "100%") {
      overlay.style.height = "0%";
    } else {
      overlay.style.height = "100%";
    }
  });

  CurrentWeather();

  searchInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      var inputCity = searchInput.value;
      searchInput.value = "";

      CityWeather(inputCity);
    }
  });

  mobileSearchInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      var inputCity = mobileSearchInput.value;
      mobileSearchInput.value = "";

      CityWeather(inputCity);
    }
  });

  myLocationButton.addEventListener("click", function (event) {
    CurrentWeather();
  });
});

function CurrentWeather() {
  $("main").remove();

  var loaderDiv = $('<div class="loader-div"><div class="loading"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div></div></div>');
  $("body").append(loaderDiv);

  (async function () {
    try {
      var position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var valid_city = await checkCity(null, latitude, longitude);

      var data = await fetchWeatherData(latitude, longitude);
      var model = new WeatherModel(data, valid_city[2]);

      loaderDiv.remove();

      $("body").append(createMain(model));
    } catch (error) {
      loaderDiv.remove();
      displayErrorMessage("Permission was denied. Allow it, or just search for a city.");
    }
  })();
}

async function CityWeather(inputCity) {
  if (inputCity === null || inputCity.trim() === "") {
    displayErrorMessage("Not a location, get your geography right and try again!");
    return;
  }

  var valid_city = await checkCity(inputCity, null, null);

  if (valid_city === false) {
    displayErrorMessage("Not a location, get your geography right and try again!");
    return;
  }

  $("main").remove();

  var loaderDiv = $('<div class="loader-div"><div class="loading"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div></div></div>');
  $("body").append(loaderDiv);

  latitude = valid_city[0];
  longitude = valid_city[1];
  fullCity = valid_city[2];

  var data = await fetchWeatherData(latitude, longitude);
  var model = new WeatherModel(data, fullCity);

  loaderDiv.remove();

  $("body").append(createMain(model));
}

function displayErrorMessage(message) {
  var popupDiv = $('<div class="popup-div"><div class="popup-message">' + message + '</div><button class="close-button">X</button></div>');
  $("body").append(popupDiv);

  $(".close-button").click(function () {
    popupDiv.remove();
  });
}
