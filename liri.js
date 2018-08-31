require("dotenv").config();


var bandsintown = require("bandsintown")("codingbootcamp");
var moment = require("moment");
moment().format();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



var command = process.argv[2];
var queryUrl = "";

var request = require("request");

if (command === "concert-this") {
    var artist = "";
    for (var i = 3; i < process.argv.length; i++) {
        artist += process.argv[i] + " ";
    }
    console.log(artist);
    bandsintown.getArtistEventList(artist).then(function (events) {
        console.log(events[0].venue.name);
        console.log(events[0].venue.city + ", " + events[0].venue.country);
    });
}

if (command === "movie-this") {
    var movieName = "";
    for (var i = 3; i < process.argv.length; i++) {
        movieName += process.argv[i] + " ";
    }
    queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log(`Title: ${movie.Title}
                        Year Release: ${movie.Released}
                        IMDB Rating: ${movie.imdbRating}
                        Rotten Tomatoes: ${movie.Ratings[1].Value}
                        Country: ${movie.Country}
                        Language: ${movie.Language}
                        Plot: ${movie.Plot}
                        Actors: ${movie.Actors}`);
        }
    });

};
if (command === "spotify-this-song") {
    var song = "";
    for (var i = 3; i < process.argv.length; i++) {
        song += process.argv[i] + " ";
    }
    spotify.search({type: "track", query: song, limit: 2}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songData = data.tracks.items;
        // console.log(songData);
        for (var i = 0; i < songData.length; i++) {
            
            console.log(`Artist: ${songData[i].artists[0].name}
            Album: ${songData[i].album.name}
            Preview: ${songData[i].preview_url}`)
        }
    });
}

// if (command === "do-what-it-says") {

// }