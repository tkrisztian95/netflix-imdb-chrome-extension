var titleCards = document.querySelectorAll('[id^="title-"]');

var apiKey = '';

const fetchIMDBValue = async (title) => {
    console.log('Fetch imdb rating of: "' + title + '"');
    const response = await fetch('https://www.omdbapi.com/?apikey=' + apiKey + '&t=' + title);
    const myJson = await response.json(); //extract JSON from the http response
    return myJson.imdbRating;
}

function delay(elem, callback) {
    var timeout = null;
    elem.onmouseover = function () {
        // Set timeout to be a timer which will invoke callback after 1s
        timeout = setTimeout(callback(elem), 5000);
    };

    elem.onmouseout = function () {
        // Clear any timers set to timeout
        clearTimeout(timeout);
    }
};

for (var i = 0, l = titleCards.length; i < l; i++) {
    var elem = titleCards[i].firstChild;
    //elem.insertAdjacentHTML('afterbegin', innerHTML);

    delay(elem, function (elem) {
        var title = elem.firstElementChild.innerText;
        console.log(title);
        fetchIMDBValue(title).then(function (result) {
            var innerHTML = '<p style="background-color: red; \
            height: 15px; \
            width: 50px; \
            z-index: 999999; \
            margin-top: 0px; \
            position: absolute; \
            top:0; right:0;">'+ "IMDB rating: " + result + '</p>';
            console.log(result);
            elem.insertAdjacentHTML('afterbegin', innerHTML);
        });

    });
}