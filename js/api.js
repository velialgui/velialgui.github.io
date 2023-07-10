const apiKey = "b6f322213e68b9b17bad20ef845b63af";

async function fetchData(latitude, longitude) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

async function checkCity(latitude, longitude, inputCity) {
  const apiUrl = inputCity
    ? `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${apiKey}`
    : `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const [data] = await response.json();
    const final = `${data.name}, ${data.country}`;
    return [data.lat, data.lon, final];
  } catch (error) {
    console.log("Error:", error);
    return false;
  }
}
//