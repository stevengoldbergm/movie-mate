// Our JavaScript Page
console.log("My javascript is working")

var mainDataEl = document.getElementById("main-data")
var ytEmbedEl = document.getElementById('yt-embed') 
var moviePosterEl = document.getElementById("movie-poster");
var movieDataEl = document.getElementById("movie-data");
console.log(movieDataEl.children)

var searchFormEl = document.querySelector("#srch-form");
var searchEl = document.querySelector("#srch-title");

searchFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    pullMovieData(event);
});

var omdbSearch = 'http://www.omdbapi.com/?t='
var OMDbApiKey = '&apikey=c26a6eef'

var youTubeApiKey = 'AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'

var ytSearch = 'https://youtube.googleapis.com/youtube/v3/search?q='
var plusTrailer = " movie trailer"
var ytApiKey = '&key=AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
var ytPart = '&part=snippet'
var ytType = '&type=video'
var ytResults = '&maxResults=1'
var ytEmbedBase = 'https://www.youtube.com/embed/'

function pullMovieData(event) {
    console.log("Clickable Object: ", event.object)
    console.log(event.type);
    console.log(searchEl.value);
    if (!searchEl.value) {
        return;
    }

    mainDataEl.classList.remove("is-hidden");

    // Front page puts in search
    // Second page loads - do this later
    var searchValue = searchEl.value;
    var searchResult = omdbSearch + searchValue + OMDbApiKey
    console.log(searchResult);

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

        // Enter Data into Data Card
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
        var movieSave = searchEl.value
        console.log("Movie save name: " + movieSave)
        localStorage.setItem("MovieMate: " + movieSave, movieSave)
        console.log(localStorage.getItem("MovieMate: " + movieSave))  

        var newLink = document.createElement("a");
        newLink.classList.add("dropdown-item");
        newLink.textContent = searchEl.value;
        console.log(newLink.textContent)
        console.log(newLink)
        console.log(dropDownMenuContent)
        dropDownMenuContent.prepend(newLink);
    })

    var ytSearchResult = ytSearch + searchValue + plusTrailer + ytPart + ytType + ytResults + ytApiKey
    console.log(ytSearchResult);

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
    
    // Add Search Term to Local Memory
    var movieSave = searchEl.value
    console.log("Movie save name: " + movieSave)
    localStorage.setItem("MovieMate: " + movieSave, movieSave)
    console.log(localStorage.getItem("MovieMate: " + movieSave))    

}


    var dropDownMenu = document.getElementById("dropdown-menu3");
    var dropDownMenuContent = document.querySelector('.dropdown-content')

    var keys = Object.keys(localStorage)
    console.log(keys)
    for (i = 0; i < keys.length; i++) {
        // Make a new a object
        var newLink = document.createElement("a");
        newLink.classList.add("dropdown-item");
        newLink.textContent = keys[i].substring(11);
        console.log(newLink.textContent)
        console.log(newLink)
        console.log(dropDownMenuContent)
        dropDownMenuContent.prepend(newLink);
        
    }

    function clearLocalStorage() {
        localStorage.clear();
        location.reload()
    }




