console.log('Starting Weather');
var request = require('request');
request({
    url: 'https://geocoder.api.here.com/6.2/geocode.json?app_id=cru3zq8CioyShXbwOHoN&app_code=jxMEX0c-rfucAapgMyMUIA&searchtext=425+W+Randolph+Chicago',
    json: true
}, function (error, response, body){
        console.log(body.Response.View[0].Result[0].Location.DisplayPosition);
})