var mongoose = require('mongoose');

//const jwt = require('jsonwebtoken');

require("dotenv").config();
var cors = require('cors')

var userSchema = mongoose.Schema({
    
    Username:{
        type: String,
        required:true
    },
    
   
   Email: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    CNIC: {
        type: String,
        required: true
    },
    Password:{
        type:String,
        required: true
    },
    ConfirmPassword:{
        type:String,
        required: true
    },
    rights: {
        type: [String],
        enum: ['Add Property', 'Edit Property', 'View Property'],
        default: ['View Property']
      }
    
});

var Users = mongoose.model('User', userSchema);
module.exports =Users;