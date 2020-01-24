//Variables
const APIKey = "e6f592e79c7cb9b9866dd3898c944975";
const cdt = moment().format("LL");
let pastCities = JSON.parse(localStorage.getItem('pstcty')) || [];
let newCity = "Phoenix";

//function to execute AJAX

function callCityRef(cityref) {

    if (cityref == "") {
        cityref = document.getElementById("cityref").value;
    }

    const queryWURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + cityref + "&units=imperial&appid=" + APIKey;

    const queryFURL = "https://api.openweathermap.org/data/2.5/forecast?" +
        "q=" + cityref + ",us&units=imperial&appid=" + APIKey;

    /*Forecast AJAX Call*/
    $.ajax({
            url: queryFURL,
            method: "GET"
        })
        .then(function(response2) {

            $(".day1").html("<ol>" + moment.utc(response2.list[0].dt_txt).format("MM/DD/YYYY") +
                "<li> <img src = 'http://openweathermap.org/img/w/" +
                response2.list[0].weather[0].icon + ".png' ></li><li>Temp: " +
                response2.list[0].main.temp +
                " °F</li><li>Humidity: " + response2.list[0].main.humidity +
                " %</li></ol>");

            $(".day2").html("<ol>" + moment.utc(response2.list[8].dt_txt).format("MM/DD/YYYY") +
                "<li> <img src = 'http://openweathermap.org/img/w/" +
                response2.list[8].weather[0].icon + ".png' ></li><li>Temp: " +
                response2.list[8].main.temp +
                " °F</li><li>Humidity: " + response2.list[8].main.humidity +
                " %</li></ol>");

            $(".day3").html("<ol>" + moment.utc(response2.list[16].dt_txt).format("MM/DD/YYYY") +
                "<li> <img src = 'http://openweathermap.org/img/w/" +
                response2.list[16].weather[0].icon + ".png' ></li><li>Temp: " +
                response2.list[16].main.temp +
                " °F</li><li>Humidity: " + response2.list[16].main.humidity +
                " %</li></ol>");

            $(".day4").html("<ol>" + moment.utc(response2.list[24].dt_txt).format("MM/DD/YYYY") +
                "<li> <img src = 'http://openweathermap.org/img/w/" +
                response2.list[24].weather[0].icon + ".png' ></li><li>Temp: " +
                response2.list[24].main.temp +
                " °F</li><li>Humidity: " + response2.list[24].main.humidity +
                " %</li></ol>");

            $(".day5").html("<ol>" + moment.utc(response2.list[32].dt_txt).format("MM/DD/YYYY") +
                "<li> <img src = 'http://openweathermap.org/img/w/" +
                response2.list[32].weather[0].icon + ".png' ></li><li>Temp: " +
                response2.list[32].main.temp +
                " °F</li><li>Humidity: " + response2.list[32].main.humidity +
                " %</li></ol>");
        })
        .catch(function() {
            alert("Please enter valid city");
        });

    /*AJAX Weather call*/
    $.ajax({
            url: queryWURL,
            method: "GET"
        })
        .then(function(response) {


            $(".city").html("<h2>" + response.name + "   (" +
                cdt + ") <img src='http://openweathermap.org/img/w/" +
                response.weather[0].icon + ".png'></h2>");
            $(".temp").text("Temperature (F) " + response.main.temp);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".wind").text("Wind Speed: " + response.wind.speed);

            setUV(response);
            saveCity(response.name);
        })
        .catch(function() {
            alert("Please enter valid city");
        });
};

function setUV(response) {

    let uvlon = response.coord.lon;
    let uvlat = response.coord.lat;

    const queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey + "&lat=" + uvlat + "&lon=" + uvlon;
    $.ajax({
            url: queryUVURL,
            method: "GET"
        })
        .then(function(response3) {
            $(".uvIndex").text("UV Index:" + response3.value);
        });
}

function saveCity(cityStore) {
    if (!pastCities.includes(cityStore)) {
        pastCities.push(cityStore);
    }

    localStorage.setItem("pstcty", JSON.stringify(pastCities));
    let cityHTML = "";

    pastCities.reverse().slice(0, 8).forEach(element => {

        cityHTML += '<button class="btn btn-outline-secondary btn-block" onclick = "callCityRef(\'' + element + '\')">' + element +
            '</button>';
    });
    $('#prselect').html(cityHTML);
}

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
callCityRef(newCity);