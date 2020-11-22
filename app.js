const apiURL = 'https://api.sunrise-sunset.org/json?';

function getAPIData(url) {
    fetch(url)
    .then(response => response.json())
    .then((jsonRes) => {
        displayData(jsonRes);
    })
    .catch(error => console.log('ERROR FETCHING API DATA:', error));
};

function displayData(jsonResponse) {
    document.getElementById('sunrise').innerHTML += formatTime(jsonResponse.results.sunrise);
    document.getElementById('sunset').innerHTML += formatTime(jsonResponse.results.sunset);
};

function formatTime(time) {
    let timeArr = time.split(':');
    let numTime = parseInt(timeArr[0]) - 5;
    timeArr[0] = numTime.toString();
    
    return timeArr.join(':');
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

async function main() {
    try {
    let coords = await getCoordinates()
    let lat = coords.coords.latitude;
    let lon = coords.coords.longitude;
    let url = `${apiURL}lat=${lat}&lng=${lon}`;
    getAPIData(url);
    } catch (err) {
        console.log(err);
    }
};

main();