//Variables
var userCity = "Houston";
var userUnit = "imperial";

//Pre-load Page with Houston's Information
getWeather("Houston","imperial");

//User Searches for City
document.querySelector(".button").addEventListener("click",function(){
  userCity = document.querySelector(".user-value").value;
  getWeather(userCity,userUnit);
});

//User Chnages Units
document.querySelector(".unit-button").addEventListener("click",function(){
  if (document.querySelector(".unit-button").textContent === "°F"){
    userUnit = "metric";
    getWeather(userCity,userUnit);
    document.querySelector(".unit-button").innerHTML = "°C".bold();
  } else{
    userUnit = "imperial";
    getWeather(userCity,userUnit);
    document.querySelector(".unit-button").innerHTML = "°F".bold();
  }
})

function getWeather(city,unit){
  //API Information
  fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=e80d8bf389889fc0ca1f59c5b010a654&units="+unit)
    .then(reponse => reponse.json())
    .then(weatherData => {
      let location = weatherData.name;
      let temperature = weatherData.main.temp;
      let icon = weatherData.weather[0].icon;
      let iconDescription = weatherData.weather[0].description;
      let pressure = weatherData.main.pressure;
      let humidity = weatherData.main.humidity;
      let wind = weatherData.wind.speed;

      //Update Site
      document.querySelector(".location").innerHTML = location;
      document.querySelector(".temperature").innerHTML = temperature;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      document.querySelector(".description").innerHTML = iconDescription;
      document.querySelector(".pressure-value").innerHTML = pressure+" hPa";
      document.querySelector(".humidity-value").innerHTML = humidity+"%";
      if (userUnit === "imperial"){
        document.querySelector(".wind-value").innerHTML = wind+" mi/hr";
      } else{
        document.querySelector(".wind-value").innerHTML = wind+" m/s";
      }

    })
  .catch(error => alert("Invalid City!"));
}
