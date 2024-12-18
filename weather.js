async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "cf596a7fd571f580eebd0ce49f954467";

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      // Extracting required data
      const temp = data.main.temp;
      const weather = data.weather[0].main;
      const cityName = data.name;

      // Updating the UI
      document.getElementById("cityName").innerText = cityName;
      document.getElementById(
        "temperature"
      ).innerText = `Temperature: ${temp}°C`;
      document.getElementById(
        "description"
      ).innerText = `Condition: ${weather}`;

      // Reset and set background based on weather condition
      document.body.className = ""; // Reset previous background
      setWeatherBackground(weather);
    } else {
      alert("City not found! Please check the city name and try again.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(
      "Unable to fetch weather data. Please check your internet connection."
    );
  }
}

/**
 * Sets the background based on weather condition.
 * @param {string} weather - The main weather condition (e.g., Clear, Clouds, Rain).
 */
function setWeatherBackground(weather) {
  switch (weather) {
    case "Clear":
      document.body.classList.add("sunny");
      break;
    case "Clouds":
      document.body.classList.add("cloudy");
      break;
    case "Rain":
    case "Drizzle":
      document.body.classList.add("rainy");
      break;
    case "Snow":
      document.body.classList.add("snowy");
      break;
    case "Thunderstorm":
      document.body.classList.add("stormy");
      break;
    default:
      document.body.style.backgroundColor = "#87CEEB"; // Default sky blue
  }
}
