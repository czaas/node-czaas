var express = require('express');
var fs = require('fs-extra');

var app = express();


app.get('/api/v1/test', function(req, res) {
  res.send('is working');
});


app.get('/api/v1/pages', function(req, res) {
  var mdFiles = './server/content';
  
  var finalFileLocation = mdFiles;

  var response = {
    success: false,
    content: ''
  };

  // If path doesn't begin with slash, send 404
  if (req.query.path[0] === '/') {
    /*
    If trailing forward slash,
      - Look for folder with index.md
      - Else remove trailing slash and look for file with .md
      - Else return 404.md
    */
    lookForFolderIndex(req.query.path, (fileRes) => {
      res.send(fileRes);
    });
  } else {
    getFourZeroFour((content) => {
      res.send(content);
    });
  }
});

app.listen('1111', function() {
  console.log('app running on port 1111');
});


function getFourZeroFour(cb) {
  var response = {
    success: false,
    content: ''
  };

  fs.readFile('./server/content/404.md', 'utf8', function(err, file) {
    if (err) { throw err; }
    
    response.success = true;
    response.content = file;
    cb(response);
  });
}

function lookForFolderIndex(thePath, cb) {
  var lookingFor = './server/content' + thePath + '/index.md';
  var folderResponse = { 
    success: false,
  };

  fs.pathExists(lookingFor, function(err, exists) {
    if (err) { throw err; }

    if (exists) {
      fs.readFile(lookingFor, 'utf8', function(err, file) {
        folderResponse.success = true;
        folderResponse.content = file;
        cb(folderResponse);
      });
    } else {
      lookForFile(thePath, cb);
    }
  });
}

function lookForFile(thePath, cb) {
  var fileToFind = './server/content' + thePath;
  var fileResponse = {
    success: false,
  };

  /*
  Replacing trailing slash with ".md"
  or adding .md to end
  */
  if (fileToFind.substr(-1) === '/') {
    fileToFind = fileToFind.substr(0, fileToFind.length - 1) + '.md';
  } else {
    fileToFind = fileToFind + '.md';
  }

  fs.pathExists(fileToFind, (err, exists) => {
    if (exists) {
      fs.readFile(fileToFind, 'utf8', (err, file) => {
        if (err) { throw err; }
        fileResponse.success = true;
        fileResponse.content = file;
        
        cb(fileResponse);
      });
    } else {
      getFourZeroFour(cb);
    }
  });
}