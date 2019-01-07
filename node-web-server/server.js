

const express = require('express');
const hbs = require('handlebars');

var port = process.env.PORT || 3000;

var app = express();

app.get('/', (req, res) => {
    console.log(req);
    res.render('Hello Express')
});
app.listen(port, ()=>{
    console.log('Starting Server');
});

