$(function() {
  
  $('.weather-temperature').openWeather({
  city: 'Toronto, ON', // city name, country / province/ state
  lat: null // defines the latitude
  lng: null // defines the longitude
  key: e6f592e79c7cb9b9866dd3898c944975
  units: "c" // defines the type of units (c or f).
  lang: 'en',
  descriptionTarget: '.weather-description',
  windSpeedTarget: '.weather-wind-speed',
  minTemperatureTarget: '.weather-min-temperature',
  maxTemperatureTarget: '.weather-max-temperature',
  humidityTarget: '.weather-humidity',
  sunriseTarget: '.weather-sunrise',
  sunsetTarget: '.weather-sunset',
  placeTarget: '.weather-place',
  iconTarget: '.weather-icon',
  customIcons: 'src/img/icons/weather/',
  success: function() {

    //show weather
    $('.weather-wrapper').show();

  },
  error: function(message) {}
  });

});