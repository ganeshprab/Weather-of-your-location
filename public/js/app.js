console.log('Client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const loadingMessage = document.querySelector('#loadingMessage')
const errorMessage = document.querySelector('#errorMessage')
const responseMessageLocation = document.querySelector('#responseMessageLocation')
const responseMessageWeather = document.querySelector('#responseMessageWeather')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const location = searchInput.value

    if (location != '') loadingMessage.textContent = 'Loading'
    errorMessage.textContent = ''
    responseMessageLocation.textContent = ''
    responseMessageWeather.textContent = ''

    

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            loadingMessage.textContent = ''
            if (data.error) errorMessage.textContent = data.error
            else {
                responseMessageLocation.textContent = data.location
                responseMessageWeather.textContent = data.weather
                console.log(data.addressProvided)
                console.log(data.location)
                console.log(data.weather)
            }
        })
    })
})