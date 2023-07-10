class WeatherModel {
  constructor(weatherData, cityName) {
    this.lat = weatherData.lat;
    this.lon = weatherData.lon;
    this.currentDate = this.setCurrentDate();
    this.celsiusTemperature = this.setTemperature(weatherData.current.temp);
    this.weatherCondition = this.setWeatherCondition(weatherData.current.weather[0].description);
    this.cityName = cityName;
    this.dailyForecast = this.setDailyForecast(weatherData.daily);
    this.sunrise = this.setFormattedTime(weatherData.current.sunrise);
    this.sunset = this.setFormattedTime(weatherData.current.sunset);
    this.feelsLike = this.setFormattedTemperature(weatherData.current.feels_like);
    this.humidity = this.setFormattedPercentage(weatherData.current.humidity);
    this.windSpeed = this.setFormattedSpeed(weatherData.current.wind_speed);
    this.uvi = Math.round(weatherData.current.uvi);
    this.dailyForecastListOne = this.setHourlyForecastList(weatherData.hourly.slice(0, 7));
    this.dailyForecastListTwo = this.setHourlyForecastList(weatherData.hourly.slice(7, 14));
  }

  setTemperature(temp) {
    const celsiusTemp = Math.round(temp - 273.15);
    return `${celsiusTemp}°C`;
  }

  setWeatherCondition(condition) {
    return condition.charAt(0).toUpperCase() + condition.slice(1);
  }

  setCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    return currentDate.toLocaleDateString("en-US", options);
  }

  setDailyForecast(dailyData) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dailyData.slice(0, 7).map(dayData => {
      const timestamp = dayData.dt * 1000;
      const dateTime = new Date(timestamp);
      const weekday = daysOfWeek[dateTime.getDay()];
      const abbreviatedWeekday = this.abbreviateWeekday(weekday);
      const minC = Math.round(dayData.temp.min - 273.15);
      const maxC = Math.round(dayData.temp.max - 273.15);
      const icon = dayData.weather[0].icon;
      return [abbreviatedWeekday, `${minC}°C`, `${maxC}°C`, icon];
    });
  }

  abbreviateWeekday(weekday) {
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

  setFormattedTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleString("en-US", options).replace(":00", "");
  }

  setFormattedTemperature(temp) {
    const celsiusTemp = Math.round(temp - 273.15);
    return `${celsiusTemp}°C`;
  }

  setFormattedPercentage(value) {
    return `${value} %`;
  }

  setFormattedSpeed(speed) {
    const wind = Math.round(speed);
    return `${wind} km/h`;
  }

  setHourlyForecastList(hourlyData) {
    return hourlyData.map(hourData => {
      const timestamp = hourData.dt * 1000;
      const timeDate = new Date(timestamp);
      const options = { hour: "numeric", hour12: true };
      const time = timeDate.toLocaleTimeString("en-US", options).replace(":00", "");
      const celsiusTemp = Math.round(hourData.temp - 273.15);
      const icon = hourData.weather[0].icon;
      return [time, icon, `${celsiusTemp}°C`];
    });
  }
}
