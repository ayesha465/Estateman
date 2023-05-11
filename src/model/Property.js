var mongoose = require('mongoose');

//const jwt = require('jsonwebtoken');

require("dotenv").config();
var cors = require('cors')

var PropertySchema = mongoose.Schema({
    
    ContractType: {
          type: String,
          enum: ['Sale', 'Rent'],
         
    },
        PropertyType: {
            
              type: String,
              enum: ['Residential', 'Commercial','Special Commercial'],
             
           
        },
            PropertyCategory: {
               
                  type: String,
                  enum: ['House', 'Penthouse','Apartment','Studio','Vila','Plot','Shop','Plaza','Agricultureland'],
                  
               
            },
    LandArea: {
        type: String,
        
    },
    Units: {
        type: String,
       
    },
    Price: {
        type: String,
        
    },
    YearBuilt: {
        type: String,
       
    },
    Title: {
        type: String,
        
    },
    Location: {
        type: String,
       
    },

    PropertyDetails:{
        City: {
            type: String,
            
        },
        Housenumber: {
            type: String,
           
        },
        Streetno: {
            type: String,
            
        },
        Society: {
            type: String,
           
        },
        Bed: {
            type: String,
         
        },
        Bath: {
            type: String,
           
        },
        Sector: {
            type: String,
           
        },
        Kitchen: {
            type: String,
            
        },
        Gas: {
          
              type: String,
              enum: ['Yes', 'No'],
              
          
        },
        Electricity: {
            
              type: String,
              enum: ['Yes', 'No'],
              
          
        },
        images: [{ type: String }],
    },
    AddCommision:{
        Amount: {
            type: String,
            
        },
       
        Cheque: {
            type:String,
        },
        AccountNumber: {
            type:String,
        },
        Branch: {
            type:String,
        },
        BankDetails: {
            type:String,
        },
    },
    OwnerDetails:{
        Name: {
            type: String,
            
        },
        ContactNumber:{
            type:String
        },
        Address:{
            type:String
        },
        AlternateNumber:{
            type:String
        },
        OwnerDescription:{
            type:String
        },
        Litigation:{
            type:String
        },
    },
    AddHistory:{
        Date: {
            type: String,
            
        },
        AddDetails: {
            type: String,
            
        },
        OccupancyStatus: {
           
              type: String,
              enum: ['Occupied'
              , 'Vacant','Sold','NotSold'],
              
           
        },
        images: [{ type: String }],
          CallDetails: [{
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
                required: true,
            },
            type: {
                type: String,
                enum: ['IncomingCallRecord', 'OutgoingCallRecord'],
                required: true,
            },
            description: {
                type: String,
            },
        }],
        AddPricingHistroy: [{
            year: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        }],
       
        LeaseExpiringOn: {
            type: Date,
          },
    }
    
    
})


var Property = mongoose.model('Property', PropertySchema);




module.exports = Property;