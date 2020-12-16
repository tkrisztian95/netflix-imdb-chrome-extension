const LOCAL_STORAGE_API_KEY = 'omdb_apikey';

function saveApiKey() {
    const apiKey = document.getElementById('apikey').value;
    const jsonFile = {};
    jsonFile[LOCAL_STORAGE_API_KEY] = apiKey;
    chrome.storage.sync.set(jsonFile);
    document.getElementById('display_message').style.display = '';
    console.log(`OMDb api key updated: ${JSON.stringify(jsonFile)}`);
}

document.getElementById('btnSetApiKey').addEventListener('click', saveApiKey);
chrome.storage.sync.get(LOCAL_STORAGE_API_KEY, (result) => {
    document.getElementById('apikey').value = result[LOCAL_STORAGE_API_KEY];
});

window.addEventListener('click', (e) => {
    if (e.target.href !== undefined) {
        chrome.tabs.create({ url: e.target.href });
    }
});
