// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var requests = require('request');
var MD5 = require("crypto-js/md5");
var mongoose = require('mongoose');
var router = express.Router();
var cookieParser=require('cookie-parser');
var session=require('express-session');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//returns and array that contains the [0]=release-date [1]=album_name [2]=genre
function request_by_title(track){
      track=track.replace(/ /g, "+");
var apikey='9d9tr5q54gdzr2mhnquenb4e';
    var shared='5nJFQnqejy';
    var seconds=Math.round(new Date().getTime()/1000);
    var key=apikey+shared+seconds.toString();
    var sig=MD5(key);
requests('http://api.rovicorp.com/data/v1.1/song/info?apikey=9d9tr5q54gdzr2mhnquenb4e&sig='+sig+'&track='+track+'&include=appearances', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var dataholder=[];
		var obj=JSON.parse(body);
    dataholder.push(obj.song.appearances[0].year);
    dataholder.push(obj.song.appearances[0].title);
		return getGenre(obj.song.appearances[0].title,dataholder);
  }
})
}
//gets genre from album title
function getGenre(album_title, data){
  console.log(album_title);
  album_title=album_title.replace(/ /g, "+");
var apikey='9d9tr5q54gdzr2mhnquenb4e';
var shared='5nJFQnqejy';
var seconds=Math.round(new Date().getTime()/1000);
var key=apikey+shared+seconds.toString();
var sig=MD5(key);
requests('http://api.rovicorp.com/search/v2.1/music/search?apikey=9d9tr5q54gdzr2mhnquenb4e&sig='+sig+'&query='+album_title+'&entitytype=album&size=1', function (error, response, body) {
if (!error && response.statusCode == 200) {

var obj=JSON.parse(body);
console.log(obj.searchResponse.results[0].album.genres[0].name);
data.push(obj.searchResponse.results[0].album.genres[0].name);
return data;
}
})

}
//sample request to show function works

//replace this with your Mongolab URL
mongoose.connect('mongodb://admin:admin@ds031962.mongolab.com:31962/5beats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var songSchema = mongoose.Schema({
	songURL: 		{type: String, required: true, unique: true},
	title:  		{type: String, required: true},
	artist: 		{type: String, required: true},
	album: 			{type: String, required: false, default:'Unknown Album'},
	year: 			{type: Number, required:false},
	trackNumber: 	{type: Number, required: false, default:0},
	uploaderID: 	{type: String, required: true},
	isPublic: 		{type: Boolean, required: true},
	albumArtURL:  	{type: String, required: false, default: ''}
});


var userSchema = mongoose.Schema({
	userName: 		{type: String, required:true, unique:true},
	imageURL: 		{type: String, required:false, default: ''},
	email: 			{type: String, required:true, unique:true}
});

var messageSchema = mongoose.Schema({
	sourceUserID: 	{type: String, required: true},
	destUserID: 	{type: String, required: true},
	message: 		{type: String, required: true},
	timestamp: 		{type: Date, required: true}
});

var friendSchema = mongoose.Schema({
	user1:  {type: String, required: true},
	user2:  {type:String, required: true}
});

var playlistSchema = mongoose.Schema({
	name: 			{type:String, required: true},
	songs:  		{type: [String], required: true},
	ownerID: 		{type:String, required:true}
});


var Song = mongoose.model('Songs', songSchema);
var User = mongoose.model('Users', userSchema);
var Message = mongoose.model('Messages', messageSchema);
var Friend = mongoose.model('Friends', friendSchema);
var Playlist = mongoose.model('Playlist', playlistSchema);

// Create our Express application
var app = express();

// Use environment defined port or 3500
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
	next();
};
app.use(cookieParser());
app.use(session({secret: 'key',resave:false,saveUninitialized:true}));
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


// All our routes will start with /api
app.use('/api', router);

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));

//Default route here
var homeRoute = router.route('/');

var usersRoute = router.route('/users');
var songsRoute = router.route('/songs');
var messagesRoute = router.route('/messages');
var friendsRoute = router.route('/friends');
var playlistsRoute = router.route('/playlists');

var userLookupRoute = router.route('/users/:objectid');
var songLookupRoute = router.route('/songs/:objectid');
var messageLookupRoute = router.route('/messages/:objectid');
var friendLookupRoute = router.route('/friends/:objectid');
var playlistsLookupRoute = router.route('/playlists/:objectid');
var loginRoute=router.route('/login');
//General purpose callbacks


// router.route('/login').post(function(res,req){
//   console.log("i am being called");
//   passport.authenticate('local', { successRedirect: '/dashboard',
//                                    failureRedirect: '/login',
//                                    failureFlash: true });}
// );
function onSave(res) {
	return function(err, savedItem){
		if (err) {
			res.status(500);
			res.json({message: String(err), data:[]});
			return;
		}

		res.status(201);
		res.json({message: 'OK', data:savedItem});
	}
}

function onGetMany(res, countQuery){
	return function(err, data){
		if(err){
			res.status(500);
			res.json({message: String(err), data:[]});
		}

		else{
			if(countQuery){
				res.status(200);
				res.json({ message: 'OK', data: data.length});
			}

			else{
				res.status(200);
				res.json({ message: 'OK', data: data});
			}
		}
	}
}

function getAndFilterResults(req, res, schema){
	var whereQuery = {};
	var sortQuery = {};
	var selectQuery = {};
	var skipQuery = {};
	var limitQuery = {};
	var countQuery = false;

	if(req.query.where){
		whereQuery = JSON.parse(req.query.where);
	}

	if(req.query.sort){
		sortQuery = JSON.parse(req.query.sort);
	}

	if(req.query.select){
		selectQuery = JSON.parse(req.query.select);
	}

	if(req.query.skip){
		skipQuery = JSON.parse(req.query.skip);
	}

	if(req.query.limit){
		limitQuery = JSON.parse(req.query.limit);
	}

	if(req.query.count && (req.query.count == "true" || req.query.count == 1)){
		countQuery = true;
	}

	schema.find(whereQuery)
	.sort(sortQuery)
	.select(selectQuery)
	.skip(skipQuery)
	.limit(limitQuery)
	.exec(onGetMany(res, countQuery));
}

function lookupItem(req, res, schema) {
	if(isNaN(parseInt(req.params.objectid))){
		res.status(404);
		res.json({message: "Item not found", data:[]});
		return;
	}

	schema.find({_id: req.params.objectid}, function(err, object){
		if(err){
			res.status(500);
			res.json({message: String(err), data:[]});
		}
		else if(object.length === 0){
			res.status(404);
			res.json({message: "Item not found", data:[]});
		}
		else{
			res.status(200);
			res.json({ message: 'OK', data: object[0]});
		}
	});
}

function deleteItem(req, res, schema){
	if(isNaN(parseInt(req.params.objectid))){
		res.status(404);
		res.json({message: "Item not found", data:[]});
		return;
	}

	schema.remove({_id: req.params.objectid}, function(err, object){
		if(err){
			res.status(500);
			res.json({message: String(err), data:[]});
		}
		else if(object.length === 0){
			res.status(404);
			res.json({message: "Item not found", data:[]});
		}
		else{
			res.status(200);
			res.json({ message: 'OK', data: object[0]});
		}
	});
}

function updateItem(req, res, schema){
	if(isNaN(parseInt(req.params.objectid))){
		res.status(404);
		res.json({message: "Item not found", data:[]});
		return;
	}

	schema.update({_id: req.params.objectid}, {$set: req.body}, function(err, object){
		if(err){
			res.status(500);
			res.json({message: String(err), data:[]});
		}
		else if(object.length === 0){
			res.status(404);
			res.json({message: "Item not found", data:[]});
		}
		else{
			res.status(200);
			res.json({ message: 'OK', data: object[0]});
		}
	});
}


// Start the server
app.listen(port);
console.log('Server running on port ' + port);



//OPTIONS fields
loginRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

usersRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

songsRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

messagesRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

friendsRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

playlistsRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

userLookupRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

songLookupRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

messageLookupRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

friendLookupRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

playlistsLookupRoute.options(function(req, res){
	res.writeHead(200);
	res.end();
});

function storesessionvar(username,req,res){
  console.log('here');
  req.session.username=username;
  //sess.username=username;
  console.log(req.session.username);
  //res.redirect("http://localhost:3000/login");
  res.json({username:req.session.username});

}
//POST Methods
loginRoute.post(function(req,res){
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.session);
  if(User.findOne({userName:req.body.username}) !=  '' )
  {
    storesessionvar(req.body.username,req,res);
  }
  passport.authenticate('local', { successRedirect: '/login',
                                     failureRedirect: '/dashboard',
                                    failureFlash: true });
});
usersRoute.post(function(req, res){
	console.log("Got POST for /users");
	var newUser = new User(req.body);
	newUser.save(onSave(res));
});

songsRoute.post(function(req, res){
	console.log("Got POST for /songs");
	var newSong = new Song(req.body);
	newSong.save(onSave(res));
});

messagesRoute.post(function(req, res){
	console.log("Got POST for /messages");
	var newMessage = new Message(req.body);
	newMessage.save(onSave(res));
});

friendsRoute.post(function(req, res){
	console.log("Got POST for /friends");
	var newFriend = new Friend(req.body);
	newFriend.save(onSave(res));
});

playlistsRoute.post(function(req, res){
	console.log("Got POST for /playlists");
	req.body.songs = JSON.parse(req.body.songs);
	var newPlaylist = new Playlist(req.body);
	newPlaylist.save(onSave(res));
});

//GET Methods (many results)

usersRoute.get(function(req, res){
	console.log("Got GET for /users");
	getAndFilterResults(req, res, User);
});

songsRoute.get(function(req, res){
	console.log("Got GET for /songs");
	getAndFilterResults(req, res, Song);
});

messagesRoute.get(function(req, res){
	console.log("Got GET for /messages");
	getAndFilterResults(req, res, Message);
});

friendsRoute.get(function(req, res){
	console.log("Got GET for /friends");
	getAndFilterResults(req, res, Friend);
});

playlistsRoute.get(function(req, res){
	console.log("Got GET for /playlists");
	getAndFilterResults(req, res, Playlist);
});


//Get Methods (single result)
loginRoute.get(function(res,req){
  console.log('hello');
});userLookupRoute.get(function(req, res){
	console.log("Got GET for /users/"+req.params.objectid);
	lookupItem(req, res, User);
});

songLookupRoute.get(function(req, res){
	console.log("Got GET for /songs/"+req.params.objectid);
	lookupItem(req, res, Song);
});

messageLookupRoute.get(function(req, res){
	console.log("Got GET for /messages/"+req.params.objectid);
	lookupItem(req, res, Message);
});

friendLookupRoute.get(function(req, res){
	console.log("Got GET for /friends/"+req.params.objectid);
	lookupItem(req, res, Friend);
});

playlistsLookupRoute.get(function(req, res){
	console.log("Got GET for /playlists/"+req.params.objectid);
	lookupItem(req, res, Playlist);
});

//DELETE methods

userLookupRoute.delete(function(req, res){
	console.log("Got DELETE for /users/"+req.params.objectid);
	deleteItem(req, res, User);
});

songLookupRoute.delete(function(req, res){
	console.log("Got DELETE for /songs/"+req.params.objectid);
	deleteItem(req, res, Song);
});

messageLookupRoute.delete(function(req, res){
	console.log("Got DELETE for /messages/"+req.params.objectid);
	deleteItem(req, res, Message);
});

friendLookupRoute.delete(function(req, res){
	console.log("Got DELETE for /friends/"+req.params.objectid);
	deleteItem(req, res, Friend);
});

playlistsLookupRoute.delete(function(req, res){
	console.log("Got DELETE for /playlists/"+req.params.objectid);
	deleteItem(req, res, Playlist);
});

//PUT methods

userLookupRoute.put(function(req, res){
	console.log("Got PUT for /users/"+req.params.objectid);
	updateItem(req, res, User);
});

songLookupRoute.put(function(req, res){
	console.log("Got PUT for /songs/"+req.params.objectid);
	updateItem(req, res, Song);
});

messageLookupRoute.put(function(req, res){
	console.log("Got PUT for /messages/"+req.params.objectid);
	updateItem(req, res, Message);
});

friendLookupRoute.put(function(req, res){
	console.log("Got PUT for /friends/"+req.params.objectid);
	updateItem(req, res, Friend);
});

playlistsLookupRoute.put(function(req, res){
	console.log("Got PUT for /playlists/"+req.params.objectid);
	req.body.songs = JSON.parse(req.body.songs);
	updateItem(req, res, Playlist);
});
