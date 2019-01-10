const mongoose = require('mongoose');
var User = mongoose.model('User', {
    username : {
        type: String,
        required: true,
        minlength: 1
    },
    email : {
        type: String,
        required : true,
        minlength: 1
    }   
});

module.exports = {User};