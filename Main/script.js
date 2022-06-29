// Search History
let history = [];

// Date Handler
const date = new Date();
const weekday = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function dayValidation (day) {
  if(day + date.getDay() > 6) {
    return day + date.getDay()-7;
  }
  else{
    return day + date.getDay();
  }
}

function renderDay () {
  for(i=0;i<5;i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[dayValidation(i)];
  }
}

// Search by City

// Search Handler
function searchHandler () {
  let city = $("#cityInput").val();
  const apiKey = '069f00a48b3e0493a615f7da951e9404';
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
  let newInput = document.getElementById("cityInput");
  city.innerHTML = "--"+newInput.value+"--";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        // renderForecast(data)
        for(i=0;i<5;i++){
        document.getElementById("day" + (i+1) + "Min")
        .innerHTML = "minTemp" + Number(data.list[i].main.temp_min -288.53)
        .toFixed(1)+"°F";
        };
        for(i=0;i<5;i++){
        document.getElementById("day" + (i+1) + "Min")
        .innerHTML = "maxTemp" + Number(data.list[i].main.temp_max -288.53)
        .toFixed(1)+"°F";
        };
        for(i=0;i<5;i++){
        document.getElementById("day" + (i+1)).src="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
        };
      });
    }
    else {
      try {
      } catch (error) {
        alert("Error encountered...")
      }
    }
  });
};

function defaultValue () {
  document.getElementById("cityInput").defaultValue = "Austin";
  searchHandler();
}

// function renderForecast (data) {
// }

// Function to update history in local storage then updates displayed history.
// function appendToHistory(search) {
//   // If there is no search term return the function
//   if (searchHistory.indexOf(search) !== -1) {
//     return;
//   }
//   searchHistory.push(search);
  
//   localStorage.setItem('search-history', JSON.stringify(searchHistory));
//   renderSearchHistory();
// }

// Function to get search history from local storage
// function initSearchHistory() {
//   var storedHistory = localStorage.getItem('search-history');
//   if (storedHistory) {
//     searchHistory = JSON.parse(storedHistory);
//   }
//   renderSearchHistory();
// }

// function handleSearchHistor(e) {
//   var searchedCity = e.target.textContent;
//   city = searchedCity;
//   fetchWeather();
// }

// Function to display the search history list.
// function renderSearchHistory() {
//   for (i = 0; i < history.length; i++) {
//     var createButton = 
//       document.createElement("button");
//       createButton.setAttribute("type", "submit");
//       createButton.setAttribute("class", "btn btn-primary search newCity");
//       createButton.innerText = city;
//       append.append(createButton);
//       createButton.addEventListener("click", historyHandler);
//   }
// }

// initSearchHistory();
// searchForm.addEventListener('submit', handleSearchForm);
// searchHistoryContainer.addEventListener('click', handleSearchHistory);
