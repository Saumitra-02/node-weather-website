const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsURL = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views path
app.set('view engine', 'hbs')
app.set('views', viewsURL)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))
// app.use(express.static(path.join(publicPath, '/about')))
// app.use(express.static(path.join(publicPath, '/help')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App Home',
        name: 'Saumitra Shinde'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Saumitra Shinde',
        title: 'About Weather App'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App Help',
        name: 'Saumitra Shinde',
        helpText: "Here's some help!"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            errorMessage: 'Pls enter a location'
        })
    }

    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.search 
            })
        })
    })
    

    // res.send({
    //     forecast: 'Toofan',
    //     location: 'KGF',
    //     address: req.query.search 
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Pls enter a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
    
app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('error', {
        title: 'Weather App',
        errorMessage: 'Help article not found',
        name: 'Saumitra Shinde'
    })
})

app.get('*', (req, res) => {
    //res.send('40004')
    res.render('error', {
        title: 'Weather App',
        errorMessage: 'Help article not found',
        name: 'Saumitra Shinde'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3k')
})