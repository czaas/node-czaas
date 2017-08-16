---
title: Sightwords for children learning to read.
description: Here I describe the purpose, how I went about building, and challenges I faced building this application.
---

# Sight Words Application

I was inspired to build this while my son was learning to read. My wife and I would practice his sight words using flashcards, when he would struggle with a word we would place that word aside in a pile and continue with the next word and so on. With flash cards we were limited to the amount of words we wanted to write on flash cards.

This application initially reaches out to a json file and saves it to localStorage. You are then prompted to create an account to start learning your sight words, your account is saved locally using the localStorage API. Once you create an account you can then select a list to start from. Main list, practice list, or view words by groups of 100. When you're viewing a word, you can mark it complete, add to practice list, or just toggle through the words using previous and next buttons.

If your web browser supports the speech synthesis API, a sound icon will appear and if clicked will read back the word on screen.

<a href="//sightwords.czaas.com" target="_blank">Check out the app.</a>

### Choosing list type

![Choosing list type](http://192.168.0.100:1111/images/sightwords-list.jpg)

### Single word view

![Single word view](http://192.168.0.100:1111/images/sightwords-single.jpg)

### Group of words view

![Group of words view](http://192.168.0.100:1111/images/sightwords-group.jpg)

### Manage account

![Manage account](http://192.168.0.100:1111/images/sightwords-manage-account.jpg)