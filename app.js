const apiURL = 'https://api.sunrise-sunset.org/json?';

function getAPIData(apiEndpointURL) {
    return fetch(apiEndpointURL)
    .then(response => response.json())
    .catch(error => console.log('ERROR FETCHING API DATA:', error));
};

function displayData(jsonResponse) {
    const sunrise = jsonResponse.results.sunrise;
    const sunset = jsonResponse.results.sunset;
    document.getElementById('sunrise-time').innerHTML += formatTime(sunrise);
    document.getElementById('sunset-time').innerHTML += formatTime(sunset);
};

function formatTime(time) {
    const date = new Date(time);
    const options = {
        hour: 'numeric', 
        minute:'numeric', 
        hour12: 'true'
    };

    return date.toLocaleString('en-US', options);
};

function getCoordinates() {
    return new Promise((res, rej) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(res, rej);
        }else {
            alert('Geolocation not supported.');
        }
    })
    .catch(err => console.log(err));
};

function getAPIEndpointURL(coordinates) {
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;

    return `${apiURL}lat=${lat}&lng=${lon}&formatted=0`;
};

async function main() {
    try {
    const coords = await getCoordinates();
    const endpointURL = getAPIEndpointURL(coords);
    const apiData = await getAPIData(endpointURL);
    displayData(apiData);
    } catch (err) {
        console.log(err);
    }
};

main();