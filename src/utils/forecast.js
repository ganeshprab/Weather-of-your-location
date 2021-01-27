const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const weatherStackURL = 'http://api.weatherstack.com/current?access_key=4beb1d590ec5e13ab27bbe36a46987db&query=' + longitude + ',' + latitude + '&units=f'

    request({url: weatherStackURL, json: true}, (error, response) => {
        if (error) {
            callback('There has been a low level error!' + '\n' + error)

        } else if (response.body.error) {
            callback( 
                'There was an problem with the coordinate supplied' + '\n' +
                'Response from the weather API:' + '\n' +
                response.body.error.info)

        } else {
            const {temperature, weather_icons , weather_descriptions} = response.body.current

            callback(undefined, {
                weatherCondition: weather_descriptions[0],
                temperature: temperature,
                weatherIcons: weather_icons[0]
            }
            // `Weather Condition: ${weather_descriptions[0]}. ` + '\n' +
            // `It is currently ${temperature} degrees out. ` + '\n' +
            // `It feels like ${feelsLike} degrees out.`
            )
        }
    })
}

module.exports = forecast