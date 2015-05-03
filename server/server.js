// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('mongodb://admin:admin@ds031962.mongolab.com:31962/5beats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var songSchema = mongoose.Schema({
	title:  		{type: String, required: true},
	artist: 		{type: String, required: true},
	album: 		{type: String, required: false, default:''},
	releaseDate: 	{type: Date, required:false},
	trackNumber: 	{type: Number, required: false, default:0},
	uploaderID: 	{type: String, required: true},
	isPublic: 	{type: Boolean, required: true}
});


var userSchema = mongoose.Schema({
	userName: 		{type: String, required:true, unique:true},
	imageURL: 		{type: String, required:false},
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

var Song = mongoose.model('Songs', songSchema);
var User = mongoose.model('Users', userSchema);
var Message = mongoose.model('Messages', messageSchema);
var Friend = mongoose.model('Friends', friendSchema);

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
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


// All our routes will start with /api
app.use('/api', router);

//Default route here
var homeRoute = router.route('/');

var usersRoute = router.route('/users');
var songsRoute = router.route('/songs');
var messagesRoute = router.route('/messages');
var friendsRoute = router.route('/friends');

var userLookupRoute = router.route('/users/:userID');
var songLookupRoute = router.route('/songs/:songID');
var messageLookupRoute = router.route('/messages/:messageID');
var friendLookupRoute = router.route('/friends/:friendID');

//General purpose callbacks

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


// Start the server
app.listen(port);
console.log('Server running on port ' + port); 



//OPTIONS fields

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


//POST Fields

usersRoute.post(function(req, res){
	console.log( req.body);
	var newUser = new User(req.body);

	console.log("Got PUT for /users");

	newUser.save(onSave(res));
});

songsRoute.post(function(req, res){
	var newSong = new Song(req.body);

	console.log("Got PUT for /songs");

	newSong.save(onSave(res));
});

messagesRoute.post(function(req, res){
	var newMessage = new Message(req.body);

	console.log("Got PUT for /users");

	newMessage.save(onSave(res));
});

friendsRoute.post(function(req, res){
	var newFriend = new Friend(req.body);

	console.log("Got PUT for /users");

	newFriend.save(onSave(res));
});






