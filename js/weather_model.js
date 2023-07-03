function WeatherModel(weatherData, cityName) {
  this.lat = weatherData.lat;
  this.lon = weatherData.lon;
  this.currentDate = setCurrentDate();
  this.celsiusTemperature = setTemperature(weatherData);
  this.weatherCondition = setWeatherCondition(weatherData);
  this.cityName = cityName;
  this.dailyForecast = setDailyForecast(weatherData);
  this.sunrise = setFormattedTime(weatherData.current.sunrise);
  this.sunset = setFormattedTime(weatherData.current.sunset);
  this.feelsLike = setFormattedTemperature(weatherData.current.feels_like);
  this.humidity = setFormattedPercentage(weatherData.current.humidity);
  this.windSpeed = setFormattedSpeed(weatherData.current.wind_speed);
  this.uvi = Math.round(weatherData.current.uvi);
  this.dailyForecastListOne = setHourlyForecastList(weatherData.hourly.slice(0, 7));
  this.dailyForecastListTwo = setHourlyForecastList(weatherData.hourly.slice(7, 14));
}

function setTemperature(weatherData) {
  const celsiusTemp = Math.round(weatherData.current.temp - 273.15);
  return `${celsiusTemp}°C`;
}

function setWeatherCondition(weatherData) {
  let weatherCondition = weatherData.current.weather[0].description;
  return weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
}

function setCurrentDate() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.toLocaleDateString("en-US", { month: "long" });
  return `${dayOfWeek} ${dayOfMonth}, ${month}`;
}

function setDailyForecast(weatherData) {
  const dailyForecast = [];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < 7; i++) {
    const dailyData = weatherData.daily[i];
    const timestamp = dailyData.dt * 1000;
    const dateTime = new Date(timestamp);
    const weekday = daysOfWeek[dateTime.getDay()];
    const abbreviatedWeekday = abbreviateWeekday(weekday);
    const minC = Math.round(dailyData.temp.min - 273.15);
    const maxC = Math.round(dailyData.temp.max - 273.15);
    const icon = dailyData.weather[0].icon;

    dailyForecast.push([abbreviatedWeekday, `${minC}°C`, `${maxC}°C`, icon]);
  }

  return dailyForecast;
}

function abbreviateWeekday(weekday) {
  const weekdays = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };
  return weekdays[weekday] || weekday;
}

function setFormattedTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleString("en-US", options).replace(":00", "");
}

function setFormattedTemperature(temp) {
  const celsiusTemp = Math.round(temp - 273.15);
  return `${celsiusTemp}°C`;
}

function setFormattedPercentage(value) {
  return `${value} %`;
}

function setFormattedSpeed(speed) {
  const wind = Math.round(speed);
  return `${wind} km/h`;
}

function setHourlyForecastList(hourlyData) {
  const hourlyForecastList = [];

  for (let i = 0; i < hourlyData.length; i++) {
    const hourData = hourlyData[i];
    const timestamp = hourData.dt * 1000;
    const timeDate = new Date(timestamp);
    const options = { hour: "numeric", hour12: true };
    const time = timeDate.toLocaleTimeString("en-US", options).replace(":00", "");
    const celsiusTemp = Math.round(hourData.temp - 273.15);
    const icon = hourData.weather[0].icon;

    hourlyForecastList.push([time, icon, `${celsiusTemp}°C`]);
  }

  return hourlyForecastList;
}
