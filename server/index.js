// Libraries
var express = require('express');
var router = express.Router();

// express configuration
var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// setting public folder
app.use(express.static('./server/public'));

// API routes
var v1PagesHandler = require('./apiV1/pages-handler.js');
app.use('/api/v1/pages', v1PagesHandler);

// Catch all else routes
app.get('*', function(req, res) {
    console.log(req.path);
    res.sendFile(__dirname + '/public/index.html');
});

app.listen('1111', function() {
  console.log('app running on port 1111');
});