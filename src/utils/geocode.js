const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F1bWl0cmFzaGluZGUiLCJhIjoiY2wzcTJtMWlwMTNwcjNrbDg5czN1ZTg2eiJ9.c7U8Tj_OZ6UgQjGcrIRB2w&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service', undefined)  // or callback('Unable to connect to location service')
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another location', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode