const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000

//to get the path to the dynamic views folder for handlebars
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//to setup express to use handlebars as the template engine
app.set('view engine', 'hbs')
//to tell express where to look for the dynamic views
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)


//express.static() to serve up static html, css, images, etc.. files
//app.use() -> for middleware
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Gautam Krishnan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Gautam Krishnan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page!',
        descr : 'Welcome to the help page!!',
        name : 'Gautam Krishnan'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error : 'Please provide an address'
        })
    }
    geocode(address, (error, { longitude, latitude, place_name} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, {summary, temperature, feelsLike} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                summary,
                temperature,
                feelsLike,
                place_name,
                address
            })

        })

    })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'Please provide a search term'
        })
    }
    res.send({
        products : []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title : 404,
        error: 'No such help article found',
        name : 'Gautam Krishnan'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title : 404,
        error : 'Page not found!',
        name  : 'Gautam Krishnan'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on ${port}`)
})