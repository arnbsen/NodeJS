const express = require('express');
const bodyparser = require('body-parser');

var {ObjectID} = require('mongodb');
var {Todo} = require('../models/todo');
var {Mongoose} = require('../db/mongoose');
var {User} = require('../models/user');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyparser.json());

// Creating API End Points

app.post('/todo', (req, res) => {
    new Todo(req.body).save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todo', (req, res) => {
    Todo.find().then((todo) => {
        res.send({todo});
    }, (e) => {
        res.status(404).send('No Todo Exists');
    });
});

app.get('/todo/:id', (req, res) => {
    var _id = req.params.id;
    if (ObjectID.isValid(_id)){
        
        Todo.findById(_id).then((todo) => {
            if (todo) {
                res.send({todo});
            } else {
                throw new Error('Note Not Found');
            }
        }).catch((e) => {
            res.send(404).send(e);
        });
    } else {
        res.status(400).send('Bad ID');
    }
});

app.delete('/todo/:id', (req, res) => {
    var _id = req.params.id;
    if (ObjectID.isValid(_id)){
        
        Todo.findByIdAndDelete(_id).then((todo) => {
            if (todo) {
                res.send({todo});
            } else {
                throw new Error('Note Not Found');
            }
        }).catch((e) => {
            res.send(404).send(e);
        });
    } else {
        res.status(400).send('Bad ID');
    }
});

app.patch('/todo/:id', (req, res) => {
    var _id = req.params.id;
    if (ObjectID.isValid(_id)){
        
        Todo.findById(_id).then((todo) => {
            if (todo) {
                if(req.body.completed != undefined && req.body.completed == true){
                    todo.set({completed: true, completedAt: new Date().getTime()})
                }
                req.body.text != undefined?todo.set({text: req.body.text}):null;
                return todo.save();
            } else {
                throw new Error('Note Not Found');
            }
        }).then((todo) => {
            if(todo) {
                res.send({todo})
            } else {
                throw new Error('Updation Failed');
            }
        }).catch((e) => {
            res.send(404).send(e);
        });
    } else {
        res.status(400).send('Bad ID');
    }
});

app.listen(3000, () => {
    console.log(`Servers up on port ${port}`)
})