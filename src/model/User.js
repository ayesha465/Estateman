var mongoose = require('mongoose');

//const jwt = require('jsonwebtoken');

require("dotenv").config();
var cors = require('cors')

var userSchema = mongoose.Schema({
    
    Username:{
        type: String,
        required:true
    },
    
   
    Password: {
        type: String,
        required: true
    },
    
});

var User = mongoose.model('User', userSchema);




module.exports = User;