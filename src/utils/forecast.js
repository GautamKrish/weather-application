const request = require('postman-request')
require('dotenv').config()

const weather_stack_api_key = process.env.WEATHER_STACK_API_KEY
const user_name = process.env.USERNAME
const password = process.env.PASSWORD
const host = process.env.HOSTNAME



const forecast = (longitude, latitude, callback) =>{
    let options = {
        url : `http://api.weatherstack.com/current?access_key=${weather_stack_api_key}&query=${latitude},${longitude}&units=f`,
        proxy : `http://${user_name}:${password}@${host}:8080`,
        json : true
    }

    request(options, (_error, { body } = {}) => {

        const { current, error } = body
        const { temperature, feelslike : feelsLike, weather_descriptions} = current
        const summary = weather_descriptions[0]
        if(_error){
            callback('Unable to connect to weather service!', undefined)
        } else if(error){
            console.log('invalid coordinates')
            let { info } = error
            callback(info, undefined)
        } else {
            callback(undefined,{
                summary,
                temperature,
                feelsLike
            })
        }
    })

}

module.exports = forecast