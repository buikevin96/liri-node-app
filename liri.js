// Is this where we place these?
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

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
			console.log(tweets); // This grabs a bunch of data, how do I grab just the last 20 tweets and when they were created?
			//console.log("Tweet: " + tweets.text);
			//console.log("Created At: " + tweets.created_at);
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
 		.search({ type: 'track', query: 'All the Small Things' })
 		.then(function(response) {
    		console.log(response);
    		console.log("Artist(s): ");
    		console.log("Song Name: ");
    		console.log("Preview link: ");
    		console.log("Album: ");
  })
  		.catch(function(err) {
    		console.log(err);
 	 });

  	// How do you default to a song?

}

function movieThis() {

	var movieName = title;

		// for (var i = 2; i < title.length; i++) {
		// 	if (i > 2 && i < title.length) {
		// 		movieName = movieName + "+" + title;				
		// 	} else {
		// 		movieName += title;
		// 	}
		// } 

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