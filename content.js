var apiKey = '';

const fetchImdbRating = async (title) => {
    console.log('Fetching imdb rating of: "' + title + '"');
    const response = await fetch('https://www.omdbapi.com/?apikey=' + apiKey + '&t=' + title);
    const myJson = await response.json(); //extract JSON from the http response
    var imdbRating = myJson.imdbRating;
    console.log('Fetched imdb rating of: "' + title + ' is ' + imdbRating);
    return imdbRating;
}

function delay(elem, callback) {
    var timeout = null;
    elem.onmouseover = function () {
        // Set timeout to be a timer which will invoke callback after 3s
        timeout = setTimeout(callback(elem), 3000);
    };

    elem.onmouseout = function () {
        // Clear any timers set to timeout
        clearTimeout(timeout);
    }
};

function getInnerHTML(rating) {
    var innerHTML = '<p style="background-color: red; \
    z-index: 2; \
    margin-top: 0px; \
    position: absolute; \
    top:0; right:0;">'+ "IMDb rating: " + rating + '</p>';
    return innerHTML;
}

function getTitleFromCard(elem) {
    var title = elem.firstElementChild.innerText;
    console.log(title);
    return title;
}

function addRatingToTitleCardElement(elem) {
    if (!elem.hasAttribute("imdb-rating")) {
        var title = getTitleFromCard(elem);
        var ratingInLocalStorage = localStorage.getItem(title);
        if (!ratingInLocalStorage) {
            fetchImdbRating(title).then(function (imdbRating) {
                localStorage.setItem(title, imdbRating);
                elem.insertAdjacentHTML('beforeend', getInnerHTML(imdbRating));
                elem.setAttribute("imdb-rating", imdbRating);
            });
        } else {
            elem.insertAdjacentHTML('beforeend', getInnerHTML(ratingInLocalStorage));
            elem.setAttribute("imdb-rating", ratingInLocalStorage);
        }
    }
}

function checkDOMChange()
{
    // check for any new element being inserted here,
    // or a particular node being modified
    var titleCards = document.querySelectorAll('[id^="title-"]');
    for (var i = 0, l = titleCards.length; i < l; i++) {
        var elem = titleCards[i].firstChild;
        delay(elem, addRatingToTitleCardElement);
    }
    // call the function again after 100 milliseconds
    setTimeout( checkDOMChange, 100 );
}

checkDOMChange();



