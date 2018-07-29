// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

// node liri.js my-tweets

// This will show your last 20 tweets and when they were created at in your terminal/bash window.

// node liri.js spotify-this-song '<song name here>'

// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.

require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var moment = require("moment");
var request = require("request");
 
var OMDBKEY = `7add416f`
var inquire = require("inquirer");


//NPM LOGGER

var filename = './log.txt';
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');


var userCommand = process.argv[2];
var secondCommand = process.argv[3];

//Concatenation

for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
};


//Spotify

let spotify = new Spotify(keys.spotify);

var getArtistNames = function (artist) {
    return artist.name;
};


let getSpotify =  function (songName) {
    if (songName === undefined) {
        songName = "The Sign";
    }

    spotify.search({
            type: "track",
            query: userCommand
    },
    function (err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }

        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(getArtistNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("-------------------------------------");
             }
         }

    );

};

//Other User Commands

function mySwitch(userCommand) {

        switch (userCommand) {

            case "my-tweets":
                getTweets();
                break;

            case "spotify-this-song":
                getSpotify();
                break;

            case "movie-this":
                getMovie();
                 break;

            case "do-what-it-says":
                doWhat();
                break;
        }

//Twitter
function getTweets() {

    var client = new Twitter(keys.twitter);

    var screenName = {
        screen_name: 'BerkeleyBootCamp'
    };

    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
    
        if (error) throw error;

        for (var i = 0; i < tweets.length; i++) {
            var date = tweets[i].created_at;
            logOutput("@BerkeleyBootCamp: " + tweets[i].text + " Posted on: " + date.substring(0, 19)); 
            logOutput("------------------------------------");
        }
    });

};

//OMDB

function getMovie() {

    var movieName = secondCommand;

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";


    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            logOutput('====================Movie Into===============');
            logOutput("Title: " + body.Title);
            logOutput("Release Year: " + body.Year);
            logOutput("IMDB Rating: " + body.imdbRating);
            logOutput("Country: " + body.Country);
            logOutput("Language: " + body.Language);
            logOutput("Plot: " + body.Plot);
            logOutput("Actors: " + body.Actors);
            logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            logOutput("Rotten Tomatoes URL: " + body.tomatoURL);
            logOutput('======================LE FIN====================');

        } else {
            console.log("Error");
        }

        if (movieName === "Fight Club") {
            console.log("---------------------");
            console.log("if you haven't seen 'Fight Club', check out the trailer: https://www.youtube.com/watch?v=SUXWAEX2jlg ");
        }
    });
}


//Do what it says

function doWhat() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
        var cmds = data.toString().split(',');
    });
}

}

mySwitch(userCommand);


