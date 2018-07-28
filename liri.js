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

const keys = require("./keys");

let Twitter = require("twitter");
let inquire = require("inquirer");
let Spotifty = require("node-spotify-api");
let request = require("request")
let fs = require("fs");

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

//HTML REQUEST _USE FOR OMBD and possible for twitter & spotify API
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

inquire
    .prompt([{
        type: "list",
        message: "Hi! This is Liri at your assistance! What would you like to search?",
        choices: ["Check the Twitter-Sphere", "Spotify Me!", "Find A Film", "Say What?"],
        name: "command",
    }]).then((userInput) => {
        console.log(userInput.command);
        if (userinput.command === "Check the Twitter-Sphere") {
            let tweet = {
                screen_name: "BerkeleyBootCamp",
            }
            twitterClient.get('statuses/user_timeline', tweet, function (erorr, tweets) {
                if (!error) {
                    for (let i = 0; i < tweets.length; i++) {
                        console.log(tweets[i].text);
                    }
                }
            })

        } else if (userInput.command === "Spotify Me!") {
            inquire 
                .prompt([{
                    type: "input",
                    message: " Enter the song you would like to search",
                    name: "song",
            

         }]).then((userinput) => {
             if (userInput.song === "") {

                spotify.search({
                    type: "track",
                    query: "The Sign",
                    limit: 5,
                }, function (error, data) {
                    let songs = data.tracks.items;
                    let getArtistNames = function (artist) {
                        return artist.name;
                    };


                for (let i = 0; i < songs.length; i++) {
                    console.log(i);
                    console.log("artist: " + songs[i].artists.map(getArtistNames));
                    console.log("song name: " + songs[i].name);
                    console.log("preview song: " + songs[i].preview_url);
                    console.log("album: " + songs[i].album.name);
                    console.log("-------------------------");
                }

                });

            })


        }else if (userInput.command === "Find A Film") {
            inquire
                .prompt([{
                    type: "input",
                    message: "What visual story would you like to inquire",
                    name: "movie",   
                }])
                .then((userInput) => {

                    if (userinput.movie === '') {

    
                      
                        var urlHit = "http://www.omdbapi.com/?t=";

                        request(urlHit, function (error, response, body) {

                            if (!error && response.statusCode === 200) {

                                let jsonData = JSON.parse(body);

                                if (jsonData.Response !== "False") {
                                    console.log("Title: " + jsonData.Title);
                                    console.log("Year: " + jsonData.Year);
                                    console.log("Rated: " + jsonData.Rated);
                                    console.log("IMDB Rating: " + jsonData.imdbRating);
                                    console.log("Country: " + jsonData.Country);
                                    console.log("Language: " + jsonData.Language);
                                    console.log("Plot: " + jsonData.Plot);
                                    console.log("Actors: " + jsonData.Actors);
                                    console.log("Rotten Tomatoes Rating: " + (jsonData.Ratings.length > 0) ? jsonData.Ratings[1].Value : '');
                                } else {
                                    console.log("No data!");
                                }  
                            }
                        });
    
                    });
    
            } else if (userInput.command === "Do what it says") {
                fs.readFile("./random.txt", function read(err, data) {
                    if (err) {
                        throw err;
                    }
                    content = data;
    
                    console.log(content);
                    processFile();
                });
            }
        })     


      































  