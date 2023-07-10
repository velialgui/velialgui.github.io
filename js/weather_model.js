function WeatherModel(weatherData, cityName) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  this.lat = weatherData.lat;
  this.lon = weatherData.lon;
  this.currentDate = getCurrentDate();
  this.celsiusTemperature = `${Math.round(weatherData.current.temp - 273.15)}°C`;
  this.weatherCondition = capitalizeFirstLetter(weatherData.current.weather[0].description);
  this.cityName = cityName;
  this.dailyForecast = setDailyForecast(weatherData.daily);
  this.sunrise = formatTime(weatherData.current.sunrise);
  this.sunset = formatTime(weatherData.current.sunset);
  this.feelsLike = formatTemperature(weatherData.current.feels_like);
  this.humidity = formatPercentage(weatherData.current.humidity);
  this.windSpeed = formatSpeed(weatherData.current.wind_speed);
  this.uvi = Math.round(weatherData.current.uvi);
  this.dailyForecastListOne = setHourlyForecastList(weatherData.hourly.slice(0, 7));
  this.dailyForecastListTwo = setHourlyForecastList(weatherData.hourly.slice(7, 14));

  function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    return currentDate.toLocaleDateString("en-US", options);
  }

  function setDailyForecast(dailyData) {
    return dailyData.slice(0, 7).map((data) => {
      const timestamp = data.dt * 1000;
      const dateTime = new Date(timestamp);
      const weekday = daysOfWeek[dateTime.getDay()];
      const abbreviatedWeekday = abbreviateWeekday(weekday);
      const minC = Math.round(data.temp.min - 273.15);
      const maxC = Math.round(data.temp.max - 273.15);
      const icon = data.weather[0].icon;

      return [abbreviatedWeekday, `${minC}°C`, `${maxC}°C`, icon];
    });
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options).replace(":00", "");
  }

  function formatTemperature(temp) {
    return `${Math.round(temp - 273.15)}°C`;
  }

  function formatPercentage(value) {
    return `${value} %`;
  }

  function formatSpeed(speed) {
    return `${Math.round(speed)} km/h`;
  }

  function setHourlyForecastList(hourlyData) {
    return hourlyData.map((data) => {
      const timestamp = data.dt * 1000;
      const timeDate = new Date(timestamp);
      const options = { hour: "numeric", hour12: true };
      const time = timeDate.toLocaleTimeString("en-US", options).replace(":00", "");
      const celsiusTemp = Math.round(data.temp - 273.15);
      const icon = data.weather[0].icon;

      return [time, icon, `${celsiusTemp}°C`];
    });
  }
}
