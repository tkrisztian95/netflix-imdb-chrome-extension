const LOCAL_STORAGE_API_KEY = "omdb_apikey";

function saveApiKey() {
    var apikey = document.getElementById('apikey').value;
    var jsonfile = {};
    jsonfile[LOCAL_STORAGE_API_KEY] = apikey;
    chrome.storage.sync.set(jsonfile);
    console.log("OMDb api key updated: " + JSON.stringify(jsonfile));
}

document.getElementById("btnSetApiKey").addEventListener("click", saveApiKey);
chrome.storage.sync.get(LOCAL_STORAGE_API_KEY, function (result) {
    document.getElementById('apikey').value = result[LOCAL_STORAGE_API_KEY];
});