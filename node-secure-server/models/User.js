const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

var UserSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        validate : {
            validator: validator.isEmail, 
            message: '{VALUE} is not a valid email'
        }
    },
    password : {
        type: String,
        minlength : 6,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({id: user._id.toHexString(), access}, 'server-secret').toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    })
   
}
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'server-secret')
    } catch (e) {
        return new Promise.reject();
    }
    User.findOne({
        '_id' : decoded._id,
        'tokens.access' : 'auth',
        'tokens.token' : token

    });
}

var User = mongoose.model('User', UserSchema);
module.exports = {User}