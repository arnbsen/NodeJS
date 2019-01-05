const request = require('request');

var getWeather = (latitude, longitute) => {
    return new Promise((resolve, reject) => {
    request({
        url: `https://api.darksky.net/forecast/e384871a08f09c61bd839c519bcb96a9/${latitude},${longitute}`,
        json: true
    }, function (error, response, body){
       
            if(!error && response.statusCode == 200){
                
                resolve({
                    current : FtoC(body.currently.temperature),
                    apparent : FtoC(body.currently.apparentTemperature)
                });
            } else {
                reject('Unable to get Weather');
            }
        });
    });
}
var FtoC = (F) => { return Math.round(((F - 32) * 5/9) * 100)/100 }
module.exports.getWeather = getWeather