# Browse NETFLIX with IMDb rating support
The extension makes it easier for you to decide which movie you want to watch based on Imdb rating. 

## Screenshots
![Screenshot](resources/capture.PNG)

## How it works:
The extension fetch the movie details from the [OMDb API](https://www.omdbapi.com/) and display the ratings.

After you hovered a movie card with your cursor the rating will appear on the top right corner. 
![Screenrecord](resources/capture.gif)

# Tasks & Imporvements

- [x] Show rating on titles which appeared just after user activity happend on page (e.g. Scroll down, slider)
- [x] Use Chrome's local storage as cache to store already fetched ratings
- [X] Store titles and ratings in JSON format on local storage
- [X] Encode uri to escape special characters
- [X] Movie not found handling

Extras:
- [ ] Reasearch other IMDb rating provider API
- [ ] Some GUI (Icon, menu, user options)
