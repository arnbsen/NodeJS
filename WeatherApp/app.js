console.log('Starting Weather');

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.a).then((result) => {
    console.log(result.address);
    return weather.getWeather(result.latitude, result.longitude);
}).then((result) => {
    console.log(`It is currently ${result.current} C. It feels like ${result.apparent} C`);
}).catch((error) => {
    console.log(error);
});