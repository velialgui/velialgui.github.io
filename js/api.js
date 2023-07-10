const apiKey = "b6f322213e68b9b17bad20ef845b63af";

async function fetchWeatherData(latitude, longitude) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function checkCity(inputCity, latitude, longitude) {
  const apiUrl = inputCity
    ? `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${apiKey}`
    : `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //const final = `${data[0].name}, ${data[0].country}`;
    const final = `${data[0].name}`;
    return [data[0].lat, data[0].lon, final];
  } catch (error) {
    console.log("Error:", error);
    return false;
  }
}
