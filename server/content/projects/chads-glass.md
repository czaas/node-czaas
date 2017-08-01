---
title: Chad's Glass | SPA developed by Cameron Zaas
description: Instagram feed wrapped in personalized UI with infinite loading
---

# Chad's Glass

This site reaches out to instagram for the first 20 or so posts and displays them in a grid. You can pull up the modal by clicking on one of the thumbnails. Videos have a video icon in the top right corner.

As you scroll down the page you will see a loading indicator, once you see this, the page reaches out to instagram and loads the next 20 until there are no more posts from him.

I decided to use <a href="https://github.com/hyperapp/hyperapp" target="_blank">hyperapp js</a> library which I was drawn to after looking through the github repo. It has a simple state, actions, and view management which allowed for a very smooth development.

Check it out <a href="http://chads-glass.czaas.com" target="_blank">chads-glass.czaas.com</a>.

![Image of modal on Chads Glass](http://192.168.0.100:1111/images/chads-glass-site.jpg)