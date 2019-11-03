// dependencies

require("dotenv").config();
var Spotify = require('node-spotify-api');
var moment = require ("moment");
var axios = require("axios");
var fs = require("fs")
var keys = require("./keys.js/index.js.js"); 

// spotify keys
var keys = require("./keys.js/index.js.js");
var spotify = new Spotify(keys.spotify)
//variable for input
var command = process.argv[2];
var input = process.argv[3];

// processes user input 
function runCommand() {
    switch (input) {
        case ("concert-this"):
            concertThis(input);
        break;
        case ("spotify-this-song"):
            if (input) {
                spotifyThisSong(input);
            }
            else {
                spotifyThisSong("The Sign");
            }
        break;
        case ("movie-this"):
            if (input) {
                movieThis(input);
            }
            else {
                movieThis("Mr. Nobody")
            }
        break;
        case ("do-what-it-says"):
          doWhatItSays()
        break;
    };
}

function concertThis(artist) {


    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        console.log("Name of the venue:", response.data[0].venue.name);
        console.log("Venue location:", response.data[0].venue.city);
        var eventDate = moment(response.data.datetime[0]).format('MM/DD/YYYY');
        console.log("Date ", eventDate);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  function spotifyThisSong(songName) {
    // var songName = value;
  
    //If user has not specified a song , default to "The Sign" by Ace of Bass
    if (songName === "") {
      songName = "I Saw the Sign";
    }
  
    spotify.search({ type: 'track', query: songName }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      
      //Artist
      console.log("Artists: ", data.tracks.items[0].album.artists[0].name)
      // A preview link 
      console.log("Preview Link: ", data.tracks.items[0].preview_url)
      // The album that the song is from
      console.log("Album Name: ", data.tracks.items[0].album.name)
    });
  }
  
  var queryURL =  "http://www.omdbapi.com/?t=&y=&plot=short&apikey=trilogy";;
  
  axios.get(queryURL).then(function(response) {



      console.log(response.data)
    // Then we print out the imdbRating
    console.log("Movie Title: " + response.data.Title);
    console.log("Year of Movie: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imbdRating);
    

  })
  .catch(function(err) {
    console.log(err);
  });



  var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
            var randomText = data.split(",");
        
        if (randomText.length == 2) {
            ask(randomText[0], randomText[1]);
        }
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
        
    });
    
}

runCommand()