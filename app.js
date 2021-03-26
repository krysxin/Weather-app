window.addEventListener("load", () => {
  let long;
  let lat;
  let api;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");
  let weatherIcon = document.getElementById("weather-icon");
  let degreeSection = document.querySelector(".degree-section");
  let degreeSpan = document.querySelector(".degree-section span");
  // TODO:Get prettier animated weather icon imgage. Add more items(e.g. max/min temp, huminity)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //   console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // openweather API
      if (position.protocol === 'http:') {
        api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=aa2097f9269153f96be15c7173ef00c9`;
     } else {
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=aa2097f9269153f96be15c7173ef00c9`;
     }
      // const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=aa2097f9269153f96be15c7173ef00c9`;
      /*
      darksky API:
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
      darksky weather icon img: https://darkskyapp.github.io/skycons/
      */

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //after get response, process data
          console.log(data);
          const Kelvin = 273;
          const { temp } = data.main; // = data.main.temp
          const city = data.name;
          const country = data.sys.country;
          const icon = data.weather[0].icon;
          //Set DOM Elements form the API
          const celsius = Math.round(temp - Kelvin);
          temperatureDegree.textContent = celsius;
          temperatureDescription.textContent = data.weather[0].description;
          locationTimeZone.textContent = `${city}, ${country}`;
          // Set Icon
          setIcon(icon);
          // Celsius<->Fahrenheit
          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "°C") {
              degreeSpan.textContent = "°F";
              temperatureDegree.textContent = cel2fahren(celsius);
            } else {
              degreeSpan.textContent = "°C";
              temperatureDegree.textContent = celsius;
            }
          });
        });
    });
  } else {
    //TODO:Show error message when geolocation is not allowed
    h1.textContent = "Browser doesn't Support Geolocation";
  }

  function setIcon(icon) {
    weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  }

  function cel2fahren(celsius) {
    fahren = (celsius * 9) / 5 + 32;
    return fahren;
  }
});
