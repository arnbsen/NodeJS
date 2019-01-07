

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
   return new Date().getFullYear();
})
hbs.registerHelper('capitizeAll' , (text) => {
    return text.toUpperCase();
})

app.set('view engine', 'hbs');


app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${req.method} ${req.path} ${now} \n`;
    fs.appendFileSync('server.log', log);
    next();
});

app.use((req, res, next) => {
    res.send('Server Under Maintaince');
});

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home',
        welcomeMessage : 'Welcome to my site'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
       
    });
})


app.listen(port, () => {
    console.log('Starting Server');
});

