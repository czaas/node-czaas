var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

router.get('/', function(req, res) {
  // If path doesn't begin with slash, send 404
  if (req.query.path[0] === '/') {
    /*
    If trailing forward slash,
      - Look for folder with index.md
      - Else remove trailing slash and look for file with .md
      - Else return 404.md
    */
    lookForFolderIndex(req.query.path, function(fileRes) {
      res.send(fileRes);
    });
  } else {
    getFourZeroFour(function(content) {
      res.send(content);
    });
  }
});

function getFourZeroFour(cb) {
  var response = {
    success: false,
    content: ''
  };

  fs.readFile('./server/content/404.md', 'utf8', function(err, file) {
    if (err) { throw err; }
    
    response.success = true;
    response.content = md.render(file);
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
        folderResponse.content = md.render(file);
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

  fs.pathExists(fileToFind, function(err, exists) {
    if (exists) {
      fs.readFile(fileToFind, 'utf8', function(err, file) {
        if (err) { throw err; }
        fileResponse.success = true;
        fileResponse.content = md.render(file);
        
        cb(fileResponse);
      });
    } else {
      getFourZeroFour(cb);
    }
  });
}

module.exports = router;