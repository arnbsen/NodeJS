const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
    var encodedAdress = address.replace(' ',  '+') 
    request({
        url: `https://geocoder.api.here.com/6.2/geocode.json?app_id=cru3zq8CioyShXbwOHoN&app_code=jxMEX0c-rfucAapgMyMUIA&searchtext=${encodedAdress}`,
        json: true
    }, function (error, response, body){
                if(error){
                    reject('Unable to connect to HERE API')
                }else if (body.Response.View.length === 0 ){
                    reject('Bad Address')
                } else {
                    resolve({
                        address: body.Response.View[0].Result[0].Location.Address.Label,
                        latitude: body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                        longitude: body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                    });
                }
            });
    });
}
module.exports.geocodeAddress = geocodeAddress