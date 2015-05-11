var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname+'/src' });
});

var port = process.env.PORT || 3000;
console.log("Express server running on " + port);
app.listen(process.env.PORT || port);
