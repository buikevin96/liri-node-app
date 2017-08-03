// Is this where we place these or within the function that it belongs?
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var command = process.argv[2]; // The action the user wants to perform
var title = process.argv[3]; // The song or movie name that the user would like to search

switch (command) {
	case "my-tweets":
		myTweets(); // will perform myTweets function
		break;
	case "spotify-this-song":
	 	spotifyThisSong(); // Will perform spotifyThisSong function
	 	break;
	case "movie-this":
		movieThis(); // Will perform movieThis function
		break;
	case "do-what-it-says":
		doWhatItSays(); // Will perform doWhatItSays function
		break;
}

// How come it is not grabbing anything?
function myTweets() {
	// Do we place the keys in here or grab them from keys.js?
	var client = new Twitter({
		consumer_key: 'uktQccsXTeLlYh1fB1YGkcHVi',
 		consumer_secret: 'nqm7RjRGHkQlFPSrPcf8eFnqpgofj3BIYBuZiUfEyQJjWXE4XT',
 		access_token_key: '892094572800692224-yg4NkmSuNFBHnmaIWFd26HcLpDu6XwW',
 		access_token_secret: 'i3837ds2RNzTX5L1rpTbIizz2pyY3TWGV60jgNA62FLdl'
	});

	var params = {screen_name: 'buiboyz'};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {

			var last20 = tweets.slice(tweets.length - 20);

			for (var i = 0; i < last20.length; i++) {
				console.log("Tweet: " + last20[i].text); // This grabs a bunch of data, how do I grab just the last 20 tweets and when they were created
				console.log("Created At: " + last20[i].created_at);
				}
			} else {
				console.log(error);
		}
	});		

}


function spotifyThisSong() {

	var spotify = new Spotify({
  		id: '62a4726d460d43089c7c2017c10ef3b1',
		secret: '7336815a72404ddfb26d35a6d0fe2a81'
	});
 
 	// https://api.spotify.com/v1/search?query=All+the+Small+Things&type=track&offset=0&limit=20
 	// Error no token provided
 	// How do you retrieve requested song information
	spotify
 		.search({ type: 'track', query: title })
 		.then(function(response) {
    		console.log(response.tracks.items[0]);
    		console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
    		console.log("Song Name: " + response.tracks.items[0].name);
    		console.log("Preview link: " + response.tracks.items[0].preview_url);
    		//console.log("Album: " + response.tracks.items[0].album[0].name);
  })
  		.catch(function(err) {
    		console.log(err);
 	 });

  	// How do you default to a song?

}

function movieThis() {

	var movieName = title;

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

		// If the request is successful
		if (!error && response.statusCode === 200) {

			// Parse the body of the site
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Released);
			console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country Produced: " + JSON.parse(body).Country);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});

}

function doWhatItSays() {

	// How do i make this run the spotifyThisSong function?

	// Running the readFile module that's inside of fs.
	// Stores the read information into variable "data"
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}

		// Break the string down by comma separation and store the contents into the output array
		var output = data.split(",");

		// Loop through the newly created output array
		for (var i = 0; i < output.length; i++) {

			// Print each element (item) of the array
			var command = process.argv[2]; // The action the user wants to perform
			var title = process.argv[3]; // The song or movie name that the user would like to search

			switch (command) {
				case "my-tweets":
					myTweets(); // will perform myTweets function
				break;
			}
		}
	});
}