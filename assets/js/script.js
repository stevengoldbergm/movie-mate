// Define Global Variables
var mainDataEl = document.getElementById("main-data")
var ytEmbedEl = document.getElementById('yt-embed') 
var moviePosterEl = document.getElementById("movie-poster");
var footer = document.getElementById("footer");
var movieDataEl = document.getElementById("movie-data");
console.log(movieDataEl.children)

var searchFormEl = document.querySelector("#srch-form");
var searchEl = document.querySelector("#srch-title");

// Add event listeners to drop-down
var dropDownMenuContent = document.querySelector('.dropdown-content')
dropDownMenuContent.addEventListener("click", fillSearch);

// Has this been searched before?
var hasHistory = false

// Search History objects
var dropDownMenu = document.getElementById("dropdown-menu3");
dropDownMenuContent = document.querySelector('.dropdown-content')
var keys = Object.keys(localStorage)

// Stop submit form from refreshing
searchFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    pullMovieData(event);
});

// OMDB Key Variables
var omdbSearch = 'https://www.omdbapi.com/?t=' // change t to s if you want a list of similar movie names
var OMDbApiKey = '&apikey=c26a6eef'


// Youtube Search Variables
var youTubeApiKey = 'AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
// var youTubeApiKey = 'AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s' // Steve's Key
var ytSearch = 'https://youtube.googleapis.com/youtube/v3/search?q='
var plusTrailer = " movie trailer"
var ytApiKey = '&key=AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
var ytPart = '&part=snippet'
var ytType = '&type=video'
var ytResults = '&maxResults=1'
var ytEmbedBase = 'https://www.youtube.com/embed/'

// Function to pull movie data (which is everything)
function pullMovieData(event) {
    console.log("hasHistory: ", hasHistory);
    // console.log("Clickable Object: ", event.target.textContent)
    console.log(event.type);
    console.log(searchEl.value);
    console.log(event.target);
    console.log(event.target.value);

    // Return if search field is empty
    if (!searchEl.value) {
        return;
    }

    // Unhide the placeholder elements
    mainDataEl.classList.remove("is-hidden");
    footer.classList.remove("is-hidden");

    // Define Search Variables
    var searchValue = searchEl.value;
    var searchResult = omdbSearch + searchValue + OMDbApiKey
    console.log(searchResult);

    // Fetch Data from OMDB
    fetch(searchResult)
    .then(function (response) {
        console.log(response);
        console.log("response Status: ", response.status);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // Data works!
        // Add Variables
        console.log("Data Variables Start:")

        // Define Title
        var title = data.Title
        console.log(title)

        // Define Actors
        var actors = data.Actors
        console.log(actors)

        // Define Directors
        var directors = data.Director
        console.log(directors)

        // Define Rated
        var rated = data.Rated
        console.log(rated)

        // Define Release Date
        var releaseDate = data.Released
        console.log(releaseDate)

        // Define Year
        var year = data.Year;
        console.log(year)

        // Define Review Score
        var reviewScore = data.imdbRating
        console.log(reviewScore)

        // Define Genre
        var genre = data.Genre
        console.log(genre)

        //Define Writers
        var writers = data.Writer
        console.log (writers)

        // Define Plot
        var plot = data.Plot;
        console.log(plot);

        // Define Poster
        var poster = data.Poster
        console.log(poster)

        // Enter Poster Data
        moviePosterEl.src = poster

        // Enter Data into Main Data Card
        movieDataEl.children[0].textContent = "Title: " + title
        movieDataEl.children[1].textContent = "Actors: " + actors
        movieDataEl.children[2].textContent = "Directed By: " + directors
        movieDataEl.children[3].textContent = "Rated: " + rated
        movieDataEl.children[4].textContent = "Released: " + releaseDate
        movieDataEl.children[5].textContent = "IMDB Review Score: " +reviewScore
        movieDataEl.children[7].textContent = "Genre: " + genre
        movieDataEl.children[8].textContent = "Writers: " + writers
        movieDataEl.children[9].textContent = "Plot Summary:"
        movieDataEl.children[10].textContent = plot

        // Add History Button

            // Define Variables
            var movieSave = searchEl.value
            console.log("Movie save name: " + movieSave)
            console.log("Storage Test: ", localStorage.getItem("MovieMate: " + movieSave), movieSave)

            // Don't add history button if local storage already exists
            if (!localStorage.getItem("MovieMate: " + movieSave)) {
                // If no local storage, then:
                localStorage.setItem("MovieMate: " + movieSave, movieSave)
                console.log(localStorage.getItem("MovieMate: " + movieSave))  

                var newLink = document.createElement("a");

                newLink.classList.add("dropdown-item");
                newLink.textContent = searchEl.value;
                console.log(newLink.textContent)
                console.log(newLink)
                console.log(dropDownMenuContent)

                dropDownMenuContent.prepend(newLink);
            }

    // Search Youtube for trailer
    // Define youtube search
    var ytSearchResult = ytSearch + title + " " + year + plusTrailer + ytPart + ytType + ytResults + ytApiKey
    console.log(ytSearchResult);

    // Pull YT data 
    fetch(ytSearchResult)
    .then(function (response) {
        console.log(response);
        console.log("response status: ", response.status);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var ytEmbedId = data.items[0].id.videoId;
        console.log(ytEmbedId);
        var ytEmbed = ytEmbedBase + ytEmbedId;
        console.log(ytEmbed);
        ytEmbedEl.src = ytEmbed
    })

    // Change title of webpage to search result
    var webpageTitle = document.getElementById("web-title")
    console.log("webtitle:", webpageTitle.textContent)
    webpageTitle.textContent = "MovieMate - " + title;
    })
    
    // Reset hasHistory to false
    hasHistory = false;

}

// Generate Search History on start-up
console.log(keys)
for (i = 0; i < keys.length; i++) {
    // Make a new a object
    var newLink = document.createElement("a");
    newLink.classList.add("dropdown-item");
    newLink.textContent = keys[i].substring(11);
    console.log(newLink.textContent);
    console.log(newLink);
    console.log(dropDownMenuContent);
    dropDownMenuContent.prepend(newLink);
    
}

// Function to clear storage
function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

// Use search history buttons to enter search value, then pull movie data
function fillSearch (event) {
    if(!event.target.textContent) {
        return;
    }

    console.log(event)
    console.log(event.target)
    console.log(event.target.textContent)
    searchEl.value = event.target.textContent;
    hasHistory = true
    pullMovieData(event);
}