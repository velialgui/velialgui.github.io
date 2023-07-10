function createMain(model) {
  const main = $("<main>");
  const container = $("<div>").addClass("container").appendTo(main);

  const content_left = $("<div>").addClass("content-left").appendTo(container);
  createCurrentWeather(model).appendTo(content_left);
  $("<section>").addClass("h2").appendTo(content_left);
  createDailyForecast(model).appendTo(content_left);

  const content_right = $("<div>").addClass("content-right").appendTo(container);
  createAirCondition(model).appendTo(content_right);
  $("<section>").addClass("h2").appendTo(content_right);
  createHourlyForecast(model).appendTo(content_right);

  return main;
}

function createCurrentWeather(model) {
  const current_weather = $("<section>").addClass("current-weather");
  const card = $("<div>").addClass("card").appendTo(current_weather);
  const weather = $("<div>").addClass("weather").appendTo(card);
  $(`<p class="class-temperature">${model.celsiusTemperature}</p>`).appendTo(weather);
  $(`<p>${model.weatherCondition}</p>`).appendTo(card);

  const list = $("<ul>").appendTo(card);
  $("<li>").append(`${model.currentDate}`).appendTo(list);
  $("<li>").append(`${model.cityName}`).appendTo(list);

  return current_weather;
}

function createDailyForecast(model) {
  const daily_forecast = $("<section>").addClass("daily-forecast");
  const card = $("<div>").addClass("card").appendTo(daily_forecast);
  const list = $("<ul>").appendTo(card);

  for (let i = 0; i < 7; i++) {
    const [weekday, minTemp, maxTemp, icon] = model.dailyForecast[i];
    const listItem = $("<li>").appendTo(list);
    listItem.append($(`<p>${weekday}</p>`));
    listItem.append($(`<p class="class-temperature">${minTemp}</p><p>/</p><p class="class-temperature">${maxTemp}</p>`));
    listItem.append($(`<img src="./assets/weathericons/${icon}.png" alt="">`));
  }

  return daily_forecast;
}

function createLongWidget(model) {
  const list = $("<ul>").addClass("long");
  $("<li>").appendTo(list).append($("<div>").addClass("sunrise").append($("<h3>Sunrise</h3>")).append($("<div>").addClass("card").append(`<p>${model.sunrise}</p>`)));
  $("<li>").appendTo(list).append($("<div>").addClass("sunset").append($("<h3>Sunset</h3>")).append($("<div>").addClass("card").append(`<p>${model.sunset}</p>`)));

  return list;
}

function createShortWidget(model) {
  const list = $("<ul>").addClass("short");
  $("<li>").appendTo(list).append($("<div>").addClass("box").append($("<h3>Feels Like</h3>")).append($("<div>").addClass("card").append('<span class="iconify" data-icon="mdi:day-temperature"></span>').append($(`<p>${model.feelsLike}</p>`))));
  $("<li>").appendTo(list).append($("<div>").addClass("box").append($("<h3>Humidity</h3>")).append($("<div>").addClass("card").append('<span class="iconify" data-icon="mdi:humidity-outline"></span>').append($(`<p>${model.humidity}</p>`))));
  $("<li>").appendTo(list).append($("<div>").addClass("box").append($("<h3>Wind Speed</h3>")).append($("<div>").addClass("card").append('<span class="iconify" data-icon="logos:windi-css"></span>').append($(`<p>${model.windSpeed}</p>`))));

  return list;
}

function createAirCondition(model) {
  const air_condition = $("<section>").addClass("air-condition");
  const container = $("<div>").addClass("container").appendTo(air_condition);
  container.append(createLongWidget(model));
  container.append(createShortWidget(model));

  return air_condition;
}

function createHourlyForecast(model) {
  const hourly_forecast = $("<section>").addClass("hourly-forecast");
  const hourly_forecast_container = $("<div>").addClass("container").appendTo(hourly_forecast);

  hourly_forecast_container.append(createHourlyForecastList(model.dailyForecastListOne));
  hourly_forecast_container.append(createHourlyForecastList(model.dailyForecastListTwo));

  return hourly_forecast;
}

function createHourlyForecastList(listData) {
  const list = $("<ul>");

  for (let i = 0; i < 7; i++) {
    const [time, icon, temperature] = listData[i];
    const listItem = $("<li>").appendTo(list);
    listItem.append(`<p>${time}</p>`);
    listItem.append(`<img src="./assets/weathericons/${icon}.png" alt="">`);
    listItem.append(`<p class="class-temperature">${temperature}</p>`);
  }

  return list;
}
