const request = require('postman-request')
require('dotenv').config()

const map_access_token = process.env.MAP_ACCESS_TOKEN
const user_name = process.env.USERNAME
const password = process.env.PASSWORD
const host = process.env.HOSTNAME

const geocode = (location, callback) => {
    locationComponent = encodeURIComponent(location)
    let options = {
        url : `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationComponent}.json?access_token=${map_access_token}&limit=1`,
        proxy : `http://${user_name}:${password}@${host}:8080`,
        json : true
    }
    request(options, (error, { body } = {}) => {
        const {features} = body
        const {place_name = 'blank', center = [1,1]} = features[0] || {}
        const longitude = center[0] 
        const latitude = center[1]
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude, 
                latitude,
                place_name
            })
        }
    })

}

module.exports = geocode