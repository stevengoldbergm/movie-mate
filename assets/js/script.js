// Our JavaScript Page
console.log("My javascript is working")

// youTubeApiKey: AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s
// q=[searchTerm]
// type=video
// part=snippet

// baseSearch: https://youtube.googleapis.com/youtube/v3/search?key=[YOUR_API_KEY]
// testSearch:https://youtube.googleapis.com/youtube/v3/search?q=Terminator Movie Trailer&part=snippet&type=video&key=AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s

// After the search pull videoId: data.items[0].id.videoId for the video ID

// embedVideo: 'https://www.youtube.com/embed/'+ videoId

// ----------------- Youtube API done // 

// OMDB start:

// OMDbApiKey: c26a6eef

// baseSearch: http://www.omdbapi.com/?s=terminator&apikey=c26a6eef
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
var plusTrailer = "movie trailer"
var ytApiKey = '&key=AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
var ytPart = '&part=snippet'
var ytType = '&type=video'
var ytResults = '&maxResults=1'
var ytEmbedBase = 'https://www.youtube.com/embed/'

function pullMovieData(event) {
    console.log(event.type);
    console.log(searchEl.value);
    // Front page puts in search
    // Second page loads - do this later
    var searchValue = searchEl.value;
    var searchResult = omdbSearch + searchValue + OMDbApiKey
    console.log(searchResult);

    fetch(searchResult) 
    .then( function (response) {
        console.log(response);
        console.log("response Status: ", response.status);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // Data works!
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
    })
    
    

}




