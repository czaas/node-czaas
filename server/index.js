// Libraries
var express = require('express');
var router = express.Router()

// express configuration
var app = express();
app.use(express.static('./server/public'));

// API routes
var v1PagesHandler = require('./apiV1/pages-handler.js');
app.use('/api/v1/pages', v1PagesHandler);

// Catch all else routes
app.get('*', function(req, res) {
  res.send('Public path not related to any listed above this.');
});

app.listen('1111', function() {
  console.log('app running on port 1111');
});