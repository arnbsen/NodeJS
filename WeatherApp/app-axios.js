console.log('Starting Weather');

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options ({
        a : {
            demand: true,
            alias : 'address',
            describe: 'Address to get Weather info',
            string: true
        }
    })
    .help ()
    .alias('help', 'h')
    .argv;

var encodedAdress = argv.a.replace(' ',  '+');
var geocodeURL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=cru3zq8CioyShXbwOHoN&app_code=jxMEX0c-rfucAapgMyMUIA&searchtext=${encodedAdress}`;
axios.get(geocodeURL).then((response) => {
    
    if (response.data.Response.View.length === 0){
        throw new Error('Bad Address');
    }

    console.log(response.data.Response.View[0].Result[0].Location.Address.Label);
    var latitude = response.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
    var longitute = response.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    var weatherURL = `https://api.darksky.net/forecast/e384871a08f09c61bd839c519bcb96a9/${latitude},${longitute}`

    return axios.get(weatherURL);

}).then((response) => {
    
    var current = FtoC(response.data.currently.temperature);
    var apparent = FtoC(response.data.currently.apparentTemperature);

    console.log(`It is currently ${current} C. It feels like ${apparent} C`);

}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log('Can\'t Reach Severs');
    } else {
        console.log(err.message);
    }
}) 
var FtoC = (F) => { return Math.round(((F - 32) * 5/9) * 100)/100 }