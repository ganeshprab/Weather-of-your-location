const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const loadingMessage = document.querySelector('#loadingMessage')
const errorMessage = document.querySelector('#errorMessage')
const responseMessageLocation = document.querySelector('#responseMessageLocation')
const responseMessageWeatherDescription = document.querySelector('#responseMessageWeatherDescription')
const responseMessageTemperature = document.querySelector('#responseMessageTemperature')
const responseMessageWeatherIcon = document.querySelector('#responseMessageWeatherIcon')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const location = searchInput.value

    if (location != '') loadingMessage.textContent = 'Loading'
    errorMessage.textContent = ''
    responseMessageLocation.textContent = ''
    responseMessageWeatherDescription.textContent = ''
    responseMessageTemperature.textContent = ''
    responseMessageWeatherIcon.src = ''
    responseMessageWeatherIcon.alt = ''


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            loadingMessage.textContent = ''
            if (data.error) errorMessage.textContent = data.error
            else {
                responseMessageLocation.textContent = data.location
                responseMessageWeatherIcon.src = data.weather.weatherIcons
                responseMessageWeatherIcon.alt = data.weather.weatherCondition + ' icon'
                responseMessageWeatherDescription.textContent = data.weather.weatherCondition
                responseMessageTemperature.textContent = data.weather.temperature + '°F'
                console.log(data.addressProvided)
                console.log(data.location)
                console.log(data.weather)
            }
        })
    })
})