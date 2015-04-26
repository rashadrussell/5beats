// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('');


var songSchema = new Schema({
  title:  		{type: String, required: true},
  artist: 		{type: String, required: true},
  album: 		{type: String, required: false, default:''},
  releaseDate: 	{type: Date, required:false},
  trackNumber: 	{type: Number, required: false, default:0},
  uploaderID: 	{type: String, required: true},
  isPublic: 	{type: Boolean, required: true}
});


var userSchema = new Schema({
	userName: 		{type: String, required:true, unique:true},
	imageURL: 		{type: String, required:false},
	email: 			{type: String, required:true, unique:true}
});



var messageSchema = new Schema({
	sourceUserID: 	{type: String, required: true},
	destUserID: 	{type: String, required: true},
	message: 		{type: String, required: true},
	timestamp: 		{type: Date, required: true}
});

var friendSchema = new Schema({
  user1:  {type: String, required: true},
  user2:  {type:String, required: true}
});

// Create our Express application
var app = express();

// Use environment defined port or 3500
var port = process.env.PORT || 3500;

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



// Start the server
app.listen(port);
console.log('Server running on port ' + port); 