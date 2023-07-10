function createMain(model) {
  var main = $("<main>");
  var container = $("<div>").addClass("container").appendTo(main);

  var content_left = $("<div>").addClass("content-left").appendTo(container);
  createCurrentWeather(model).appendTo(content_left);
  $("<section>").addClass("h2").appendTo(content_left);
  createDailyForecast(model).appendTo(content_left);

  var content_right = $("<div>").addClass("content-right").appendTo(container);
  createAirCondition(model).appendTo(content_right);
  $("<section>").addClass("h2").appendTo(content_right);
  createHourlyForecast(model).appendTo(content_right);

  return main;
}

function createCurrentWeather(model) {
  var current_weather = $("<section>").addClass("current-weather");
  var card = $("<div>").addClass("card").appendTo(current_weather);
  var weather = $("<div>").addClass("weather").appendTo(card);
  $(`<p>${model.celsiusTemperature}</p>`).appendTo(weather);
  $(`<p>${model.weatherCondition}</p>`).appendTo(card);

  var list = $("<ul>").appendTo(card);
  $("<li>").append(`${model.currentDate}`).appendTo(list);
  $("<li>").append(`${model.cityName}`).appendTo(list);

  return current_weather;
}

function createDailyForecast(model) {
  var daily_forecast = $("<section>").addClass("daily-forecast");
  var card = $("<div>").addClass("card").appendTo(daily_forecast);
  var list = $("<ul>").appendTo(card);

  for (var i = 0; i < 7; i++) {
    var listItem = $("<li>").appendTo(list);
    listItem.append($(`<p>${model.dailyForecast[i][0]}</p>`));
    listItem.append($(`<p>${model.dailyForecast[i][1]}/<span>${model.dailyForecast[i][2]}</span></p>`));
    listItem.append($(`<img src="./assets/weathericons/${model.dailyForecast[i][3]}.png" alt="">`));
  }

  return daily_forecast;
}

function createLongWidget(model) {
  var list = $("<ul>").addClass("long");
  $("<li>").appendTo(list).append($("<div>").addClass("sunrise").append($("<h3>Sunrise</h3>")).append($("<div>").addClass("card").append(`<p>${model.sunrise}</p>`)));
  $("<li>").appendTo(list).append($("<div>").addClass("sunset").append($("<h3>Sunset</h3>")).append($("<div>").addClass("card").append(`<p>${model.sunset}</p>`)));

  return list;
}

function createShortWidget(model) {
  var list = $("<ul>").addClass("short");
  $("<li>").appendTo(list).append($("<div>").addClass("box").append($("<h3>Feels Like</h3>")).append($("<div>").addClass("card").append('<span class="iconify" data-icon="mdi:day-temperature"></span>').append($(`<p>${model.feelsLike}</p>`))));
  $("<li>").appendTo(list).append($("<div>").addClass("box").append($("<h3>Humidity</h3>")).append($("<div>").addClass("card").append('<span class="iconify" data-icon="mdi:humidity-outline"></span>').append($(`<p>${model.humidity}</p>`))));
  $("<li>").appendTo(list).append($("<div>").addClass("box").append($("<h3>Wind Speed</h3>")).append($("<div>").addClass("card").append('<span class="iconify" data-icon="logos:windi-css"></span>').append($(`<p>${model.windSpeed}</p>`))));

  return list;
}

function createAirCondition(model) {
  var air_condition = $("<section>").addClass("air-condition");
  var container = $("<div>").addClass("container").appendTo(air_condition);
  container.append(createLongWidget(model));
  container.append(createShortWidget(model));

  return air_condition;
}

function createHourlyForecast(model) {
  var hourly_forecast = $("<section>").addClass("hourly-forecast");
  var hourly_forecast_container = $("<div>").addClass("container").appendTo(hourly_forecast);

  hourly_forecast_container.append(createHourlyForecastList(model.dailyForecastListOne));
  hourly_forecast_container.append(createHourlyForecastList(model.dailyForecastListTwo));

  return hourly_forecast;
}

function createHourlyForecastList(listData) {
  var list = $("<ul>");

  for (var i = 0; i < 7; i++) {
    var listItem = $("<li>").appendTo(list);
    listItem.append(`<p>${listData[i][0]}</p>`);
    listItem.append(`<img src="./assets/weathericons/${listData[i][1]}.png" alt="">`);
    listItem.append(`<p>${listData[i][2]}</p>`);
  }

  return list;
}