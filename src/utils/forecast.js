const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/4bd6f6f76cd13d53c85e0d7a84af8f3d/37.8267,-122.4233?units=si&lang=es'
    const url = 'https://api.darksky.net/forecast/4bd6f6f76cd13d53c85e0d7a84af8f3d/' + latitude + ',' + longitude + '?units=si'

    //request({url: url}, (error, response) => {
    request({url, json: true}, (error, {body}) => {    
        //const data = JSON.parse(response.body)
        //console.log(response.body.currently)
        if(error){
            //console.log("Unable to connect to weather service")
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error){
            //console.log('Unable to find location')
            callback('Unable to find location', undefined)
        }
        else{
            //console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. There is " + response.body.currently.precipProbability + "% chance of rain")
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability + "% chance of rain")
        }
        
    })
}

module.exports = forecast