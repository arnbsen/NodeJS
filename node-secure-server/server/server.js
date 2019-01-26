const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash');

var {ObjectID} = require('mongodb');
var {User} = require('../models/User');


var port = process.env.port || 3000;

var app = express();
app.use(bodyparser.json());

app.post('/users/register', (req, res) => {
    var body = _.pick(req.body, ['email','password']);
    var newUser = new User(body);
    newUser.save().then(() => {
       return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
    
    // }).then((token) => {
    // newUser.save().then(() => {
    //     return 
    //     res.header('x-auth', token).send(newUser);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
});
app.listen(port, () => {
    console.log(`Server is up on PORT: ${port}`);
})