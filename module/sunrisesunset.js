class SunriseSunset() {
    constructor() {
        this.coordinates = this.getCoordinates();
        this.endpointURL = this.getAPIEndpointURL(this.coordinates);
        this.apiData = this.getAPIData(this.endpointURL);
    }

    this.apiURL = 'https://api.sunrise-sunset.org/json?';

    getAPIData(apiEndpointURL) {
    return fetch(apiEndpointURL)
    .then(response => response.json())
    .catch(error => console.log('ERROR FETCHING API DATA:', error));
};

    displayData(jsonResponse) {
    const sunrise = jsonResponse.results.sunrise;
    const sunset = jsonResponse.results.sunset;
    document.getElementById('sunrise').innerHTML += formatTime(sunrise);
    document.getElementById('sunset').innerHTML += formatTime(sunset);
};

    formatTime(time) {
        const date = new Date(time);
        const options = {
            hour: 'numeric', 
            minute:'numeric', 
            hour12: 'true'
        };

        return date.toLocaleString('en-US', options);
    };

    getCoordinates() {
        return new Promise((res, rej) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(res, rej);
            }else {
                alert('Geolocation not supported.');
            }
        })
        .catch(err => console.log(err));
    };

    getAPIEndpointURL(coordinates) {
        const lat = coordinates.coords.latitude;
        const lon = coordinates.coords.longitude;

        return `${apiURL}lat=${lat}&lng=${lon}&formatted=0`;
    };
}


async function main() {
    try {
    const sunTimes = SunriseSunset();
    await sunTimes.getCoordinates();


    const coords = await getCoordinates();
    const endpointURL = getAPIEndpointURL(coords);
    const apiData = await getAPIData(endpointURL);
    displayData(apiData);
    } catch (err) {
        console.log(err);
    }
};

main();