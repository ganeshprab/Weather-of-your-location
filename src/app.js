const path = require('path')
const express = require('express')
const { isAbsolute } = require('path')
const hbs = require('hbs')
const { request } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Randy Proctor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Randy Proctor'
    })
})

app.get('/feedback', (req, res) => {
    res.render('feedback', {
        help: 'This is the help page',
        title: 'Feedback',
        name: 'Randy Proctor'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({ error: 'Please provide an address or location' })
    } else {
        geocode(req.query.address, (geocodeError,  geoData) => {
            if (geocodeError) {
                res.send({ error: geocodeError })
            } else {   
                forecast(geoData.longitude, geoData.latitude, (forecastError, forecastData) => {
                    if (forecastError) 
                    {res.send({ error: forecastError })
                    } else {
                        res.send({
                            'addressProvided': req.query.address,
                            location: geoData.location,
                            weather: forecastData
                        })  
                    }
                })
            }
        })      
    } 
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Randy Proctor',
        error_message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Randy Proctor',
        error_message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})