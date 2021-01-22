const request = require('request')

const geocode = (address, callback) => {
    const mapboxURL = 
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFuZG9uc3Jwcm9jdG9yIiwiYSI6ImNranluMTFpczAxemsydXBvMTczM2FvbG0ifQ.e5xXD35YXI0xxV0p1K1G4A&limit=1'

    request({url: mapboxURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (response.body.message === "Forbidden" || 
                   response.body.features.length === 0) {
            callback('Unable to find location.  Try another search!')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode