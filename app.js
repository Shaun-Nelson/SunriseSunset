// const apiURL = 'https://api.sunrise-sunset.org/json?';
// const apiURL = 'https://api.openweathermap.org/data/2.5/weather?';
// const apiKey = '912f3dd2d8772ce1a1263d34855d3556';
const apiURL = 'https://api.met.no/weatherapi/sunrise/2.0/.json?';

function getAPIData(url) {
    fetch(url)
    .then(response => response.json())
    .then((jsonRes) => {
        displayData(jsonRes);
    })
    .catch(error => console.log('ERROR FETCHING API DATA:', error));
};

function displayData(jsonResponse) {
    let sunrise = jsonResponse.location.time[0].sunrise.time;
    let sunset = jsonResponse.location.time[0].sunset.time;
    document.getElementById('sunrise').innerHTML += formatSunriseTime(sunrise);
    document.getElementById('sunset').innerHTML += formatSunsetTime(sunset);
};

function formatSunriseTime(time) {
    let date = new Date(time);
    return (date.toTimeString().split(' ')[0] + ' AM').slice(1);
};

function formatSunsetTime(time) {
    let date = new Date(time);
    let output = date.toTimeString().split(' ')[0].split(':');
    let hour = (output[0] - 12).toString();
    output[0] = hour;

    return output.join(':') + ' PM';
};

function getDate() {
    let date = new Date
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

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
    getDate();
    let coords = await getCoordinates()
    let lat = coords.coords.latitude;
    let lon = coords.coords.longitude;
    let date = getDate();
    let url = `${apiURL}lat=${lat}&lon=${lon}&date=${date}&offset=-05:00`;
    getAPIData(url);
    } catch (err) {
        console.log(err);
    }
};

main();