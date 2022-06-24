// OpenWeather API credentials
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationInput + "&appid=" + apiKey + "&units=imperial";;
var apiKey = '069f00a48b3e0493a615f7da951e9404';

// Query elements
var searchForm = document.querySelector('#search-form');
var locationInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');

// Search History
var history = [];

// Search 
function searchHandler (event) {
  event.preventDefault();
  city = locationInput.value.trim();
  fetchWeather(city);
  fetchForecast(city);
};

// Fetches weather data
function fetchWeather() {
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var city = data.name;
        renderWeather(data, city)
        renderSearchHistory(city);
      });
    }
  })
}

var fetchForecast = function () {
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        renderForecast(data)
      });
    }
  });
};

// Function to update history in local storage then updates displayed history.
function appendToHistory(search) {
  // If there is no search term return the function
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);
  
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  renderSearchHistory();
}

// Function to get search history from local storage
function initSearchHistory() {
  var storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}

// Function to display the current weather data fetched from OpenWeather api.
function renderWeather(locationWeather) {
  var icon = locationWeather.weather[0].icon;
  var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
  currentCityIconEl.setAttribute("src", iconUrl);

  //convert UNIX date timestamp into readable format
  var currentDate = moment.unix(locationWeather.dt).format("MM/DD/YYYY");

  //render name of the city and the current date
  currentCity = cityWeather.name + " " + currentDate;
  currentCityEl.textContent = currentCity;

  //render location's temperature
  var cityTemperature = Math.floor(locationWeather.main.temp);
  currentTempEl.textContent = cityTemperature;

  //render location's humidity
  var cityHumidity = cityWeather.main.humidity;
  currentHumidityEl.textContent = cityHumidity;

  //render location's wind speed
  var cityWindSpeed = cityWeather.wind.speed;
  currentWindSpeedEl.textContent = cityWindSpeed;
}


// 5 day Weather Forecast
function renderForecast(locationWeather) {
  // loop through five day forecast and render to html
  for (var i = 0; i < 5; i++) {
    // fetch date
    var currentDate = moment
      .unix(locationWeather.list[(i + 1) * 8 - 1].dt)
      .format("dddd MM/DD/YYYY");
    // fetch weather icon
    var icon = locationWeather.list[(i + 1) * 8 - 1].weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
    // fetch temperature
    var cityTemperature = Math.floor(
      locationWeather.list[(i + 1) * 8 - 1].main.temp
    );
    // fetch humidity
    var cityHumidity = locationWeather.list[(i + 1) * 8 - 1].main.humidity;  
    
  }
}

function renderItems(city, data) {
  renderCWeather(city, data.current, data.timezone);
  renderForecast(data.daily, data.timezone);
}

function fetchCoords(search) {
  var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
  
  fetch(apiUrl)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    if (!data[0]) {
      alert('Location not found');
    } else {
      appendToHistory(search);
      fetchWeather(data[0]);
    }
  })
  .catch(function (err) {
    console.error(err);
  });
}

function handleSearchHistor(e) {
  var searchedCity = e.target.textContent;
  city = searchedCity;
  fetchWeather();
}

// Function to display the search history list.
function renderSearchHistory() {
  for (i = 0; i < history.length; i++) {
    var createButton = 
      document.createElement("button");
      createButton.setAttribute("type", "submit");
      createButton.setAttribute("class", "btn btn-primary search newCity");
      createButton.innerText = city;
      append.append(createButton);
      createButton.addEventListener("click", historyHandler);
  }
}

initSearchHistory();
searchForm.addEventListener('submit', handleSearchForm);
searchHistoryContainer.addEventListener('click', handleSearchHistory);
