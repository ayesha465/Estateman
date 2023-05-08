var mongoose = require('mongoose');

require("dotenv").config();


var AuctionSchema = mongoose.Schema({
    
    
        Auctioneer: {
            type: [{
              type: String,
              enum: ['Bank', 'Government'],
             
            }],
        },
           
    Title: {
        type: String,
        
    },
    City: {
        type: String,
       
    },
    Society: {
        type: String,
        
    },
    LandArea: {
        type: String,
       
    },
    Units: {
        type: String,
        
    },
    PlaceofAuction: {
        type: String,
       
    },
    Location: {
        type: String,
        
    },
    AuctionDateandTime: {
        type: Date,
        
    },
    Balance: {
        type: String,
        
    },
    ReservePrice: {
        type: String,
        
    },
    ContactPerson: {
        type: String,
        
    },
    ContactNumber: {
        type: String,
        
    },
    PlaceofAuction: {
        type: String,
        
    },
    images: [{ type: String }],
})
var Auctions = mongoose.model('Auction',AuctionSchema)
module.exports = Auctions;