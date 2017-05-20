var express = require('express');
var path = require('path');

var app = express();
env = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 5001;

app.use('/assets', express.static(path.join(__dirname + '/src/assets')));


app.get('*', function(req, res, next) {
    res.sendfile('index.html', { root: __dirname + '/src'}); // load the single view file
});

app.listen(PORT, function () {
    console.log('Listening on PORT ' + PORT);
});
