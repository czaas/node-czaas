---
title: Rebuilt version of my website
description: Stack overview of my website built using Express API for the backend and Hyperapp SPA for the front end.
---

# CZaas.com

Welcome to my site! I rebuilt this site with the purpose of solving a few issues for myself; quickly and easily update the content on my server, blazing fast front end, and to keep it simple.

## On the backend

I decided to go with Express JS for the backend because it's a solid framework with easy setup for routing and customization for middleware and I have the most experience with it. 

If we take a look at the meat of the server:

__Static assets__ - Images, CSS, JS

```
app.use(express.static('./server/public'));
``` 

__API__ - A single API route that looks for requests before sending the single HTML file. More on the endpoint later.

```
var v1PagesHandler = require('./apiv1/pages-handler.js');
app.use('/api/v1/pages', v1PagesHandler);
```

__Catch all__ - Anything that doesn't exists in the public folder or does not match the API routes. 

This is the only HTML file served for the entire site regardless of which URL path is requested. 

```
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
```

### The API endpoint

I decided I needed a server that would have an endpoint I could pass a route to, and return just the markdown content along with the meta for the page requested.

I have a folder with just markdown files where this is setup to look for the files. At the time of writing this, I have 3 functions which are setup to look for markdown files and 1 function which converts the found markdown file content into a JSON object to send back to the front end.

1. Has a quick sanity check to make sure the first character requested is a forward slash. If not, it sends down the 404 content.
2. Then it runs the `lookForFolderIndex` function which looks for a folder with the requested path and checks if an index.md file exists, if so, sends it back.
3. Within the step 2 function, if it fails, it will run `lookForFile` function which looks for a file with the name of the path requested then sends it back.
4. If both step 2 and 3 fails, it runs the final function `getFourZeroFour` which gets the 404 file and sends it down.

```
if (req.query.path[0] === '/') {
  lookForFolderIndex(req.query.path, function(fileRes) {
    res.send(processMarkdown(fileRes));
  });
} else {
  getFourZeroFour(function(content) {
    res.send(processMarkdown(content));
  });
}
```

## On the front end

I've been on a kick lately with the <a href="https://github.com/hyperapp/hyperapp" target="_blank">Hyperapp SPA framework</a>. Its selling point is it's a 1kb library with a virtual DOM and state management included. 

On page load once the JS is parsed this app collects the current window path and makes a fetch request to the API. It will receive a JSON object back looking something like this:

```
{
  content: {
    meta: {
      title: "...",
      description: "...",
    },
    html: "...."
  },
  success: true
}
```

Once that object is received, it updates the meta and page content. The Markdown to HTML parsing is happening on the server. This application tracks the loading indicator and whether the mobile menu is open. 

## Performance

According to <a href="https://gtmetrix.com/reports/czaas.com/E3fLXWQ4" target="_blank">GTMetrix</a> my site loadings in less than 500ms and less the 16kb page size.