//Configuration For Mongoose

const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/SecureApp',  {useNewUrlParser: true});
module.exports  = {
    mongoose
}