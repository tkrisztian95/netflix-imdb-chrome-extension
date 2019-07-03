const LOCAL_STORAGE_RATINGS = "imdb_ratings";
const LOCAL_STORAGE_API_KEY = "omdb_apikey";

var apiKey = "";

chrome.storage.sync.get(LOCAL_STORAGE_API_KEY, function (result) {
    console.log(result);
    apiKey = result[LOCAL_STORAGE_API_KEY];
    console.log("Api key loaded:" + apiKey)
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        if (key === LOCAL_STORAGE_API_KEY) {
            console.log("Api key updated");
            apiKey = storageChange.newValue;
        }
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});

const fetchImdbRating = async (title) => {
    console.log('Fetching imdb rating of: "' + title + '"');
    const response = await fetch(encodeURI('https://www.omdbapi.com/?apikey=' + apiKey + '&t=' + title));
    const myJson = await response.json(); //extract JSON from the http response

    var imdbRating = myJson.imdbRating;

    if (myJson["Error"] && myJson["Error"] === "Movie not found!") {
        console.log("Movie not found:" + title);
        imdbRating = "Not found";
    } else {
        console.log('Fetched imdb rating of: "' + title + ' is ' + imdbRating);
    }
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
        var ratingInLocalStorage = getRatingFromLocalStorage(title);
        if (!ratingInLocalStorage) {
            fetchImdbRating(title).then(function (imdbRating) {
                storeRatingInLocalStorage(title, imdbRating);
                elem.insertAdjacentHTML('beforeend', getInnerHTML(imdbRating));
                elem.setAttribute("imdb-rating", imdbRating);
            });
        } else {
            elem.insertAdjacentHTML('beforeend', getInnerHTML(ratingInLocalStorage));
            elem.setAttribute("imdb-rating", ratingInLocalStorage);
        }
    }
}

function storeRatingInLocalStorage(title, rating) {
    if (title && rating && rating !== "Not found") {
        var ratingsInStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RATINGS));
        if (!ratingsInStorage) {
            ratingsInStorage = {};
        }
        ratingsInStorage[title] = rating;
        localStorage.setItem(LOCAL_STORAGE_RATINGS, JSON.stringify(ratingsInStorage));
    }
}

function getRatingFromLocalStorage(title) {
    var ratingsInStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RATINGS));
    var rating = ratingsInStorage && ratingsInStorage[title];
    return rating;
}


function checkDOMChange() {
    // check for any new element being inserted here,
    // or a particular node being modified
    var titleCards = document.querySelectorAll('[id^="title-"]');
    for (var i = 0, l = titleCards.length; i < l; i++) {
        var elem = titleCards[i].firstChild;
        delay(elem, addRatingToTitleCardElement);
    }
    // call the function again after 100 milliseconds
    setTimeout(checkDOMChange, 100);
}

checkDOMChange();



