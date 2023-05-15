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
        imagePath: [
            {
                type: String,
                
            }
          ]
    },
    AddCommission:{
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
        Calltype: {
            type: String,
            enum: ['IncomingCallRecord', 'OutgoingCallRecord'],
            required: true,
        },
        
        imagePath:
         [
            { type: String }
        ],
          CallDetails: [{
            Date: {
                type: Date,
            },
            From: {
                type: String,
                required: true,
            },
            Name: {
                type: String,
            },
            To: {
                type: String,
                required: true,
            },
            
            
        
        }],
        AddPricingHistory: [{
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