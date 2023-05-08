const config = require("../config/auth");
const bcrypt = require('bcrypt');
BCRYPT_SALT = 10;



 const Property = require("../model/Property");




exports.addProperty = async (req, res) => {
    try {
        
        // Check if PropertyType is valid
        if (req.body.PropertyType && !['Residential', 'Commercial', 'Special Commercial'].includes(req.body.PropertyType)) {
            return res.status(400).json({
                success: false,
                message: `Invalid PropertyType value: ${req.body.PropertyType}`,
                status: 400
            });
        }

        // Check if PropertyCategory is valid
        if (req.body.PropertyCategory && !['House', 'Penthouse', 'Apartment', 'Studio', 'Vila', 'Plot', 'Shop', 'Plaza', 'Agricultureland'].includes(req.body.PropertyCategory)) {
            return res.status(400).json({
                success: false,
                message: `Invalid PropertyCategory value: ${req.body.PropertyCategory}`,
                status: 400
            });
        }
        console.log("x",req.body)
       const user=await Property.create(req.body)
        
        const msg = {
            success: "true",
            message: "property added successfully",
            data: user,
            Status: 201,
        };
        return res.status(201).json(msg);
    } catch (err) {
        return res.status(500).json({
            success: "false",
            message: "Failed to Add Property",
            Status: 500,
        });
    }
};



exports.updateProperty = async (req, res) => {
  try {
    const id = req.query.id;
    
    const property = await Property.findByIdAndUpdate(id,req.body);
    console.log(property)
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
        status: 404
      });
    }
   
    const msg = {
      success: true,
      message: "Property updated successfully",
      data: property,
      status: 200,
    };
   
    return res.status(200).json(msg);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to update Property",
      status: 500,
    });
  }
};





  /*exports.AddOwnerDetails = async (req, res) => {
    try {
      const user = new Property({
        OwnerSchema:{
        Name: req.body.Name,
        ContactNumber: req.body.ContactNumber,
        Address: req.body.Address,
        AlternateNuber: req.body.AlternateNuber,
        OwnerDescription: req.body.OwnerDescription,
        Litigation: req.body.Litigation,
        }
      });
      console.log("hhsj", user);
      await user.save();
      console.log("request is incoming");
      return res.send({
        success: "true",
        message: "owner details added successfully",
        data: {
          id: user._id,
          OwnerSchema:{
          Name: user.OwnerSchema.Name,
          ContactNumber: user.OwnerSchema.ContactNumber,
          Address: user.OwnerSchema.Address,
          AlternateNumber: user.OwnerSchema.AlternateNumber,
          OwnerDescription: user.OwnerSchema.OwnerDescription,
          Litigation: user.OwnerSchema.Litigation,
          }
        },
        Status: 200,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to add owner details",
        Status: 500,
        error: err.message,
      });
    }
  };
  
  exports.addhistory = async (req, res) => {
    try {
        const { Date,OccupancyStatus ,images,CallDetails,AddPricingHistroy,LeaseExpiryDate,AddDetails} = req.body;

        // Check if ContractType is valid
        if (CallDetails && CallDetails.some(cd => !['IncomingCallRecord', 'OutgoingCallRecord'].includes(cd.type))) {
            return res.status(400).json({
                success: false,
                message: `Invalid value in CallDetails array`,
                status: 400
            });
        }
        if (OccupancyStatus  && !['Occupied', 'Vacant','Sold','NotSold'].includes(OccupancyStatus )) {
            return res.status(400).json({
                success: false,
                message: `Invalid  value: ${OccupancyStatus }`,
                status: 400
            });
        }
        const user = new Property({
          
            ADDHIStORY: {
              Date,
              AddDetails,
              OccupancyStatus,
              images,
              CallDetails,
              AddPricingHistroy,
              LeaseExpiryDate,
            },
        });
        user.id = user._id; 
        await user.save();
        const msg = {
            success: "true",
            message: "  History added successfully",
            data: user,
            Status: 201,
        };
        return res.status(201).json(msg);
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: "false",
            message: "Failed to Add PropertyHistory",
            Status: 500,
        });
    }
};




exports.AddCommission = async (req, res) => {
    try {
      const user = new Property({
        ADDCOM:
        {
        Amount: req.body.Amount,
        Cheque: req.body.Cheque,
        AccountNumber: req.body.AccountNumber,
        Branch: req.body.Branch,
        BankDetails: req.body.BankDetails,
        }
      });
      console.log("hhsj", user);
      await user.save();
      console.log("request is incoming");
      return res.send({
        success: "true",
        message: "commission added successfully",
        data: {
          id: user._id,
          ADDCOM:{
          Amount: user.ADDCOM.Amount,
          Cheque: user.ADDCOM.Cheque,
          AccountNumber: user.ADDCOM.AccountNumber,
          Branch: user.ADDCOM.Branch,
          BankDetails: user.ADDCOM.BankDetails,
          
          }
        },
        Status: 200,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to add owner details",
        Status: 500,
        error: err.message,
      });
    }
  };
*/
exports.getAllHistory = (req, res) => {
  Property.find({})
    .then(properties => {
      const data = properties.map(property => {
        const history = property.AddHistory;
        const commission = property.AddCommision;
        return { AddHistory: history, AddCommision: commission };
      });
      const msg = {
        success: true,
        message: "Property history and commission retrieved successfully",
        data,
        status: 200
      };
      return res.json(msg);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve property history and commission",
        status: 500
      });
    });
};


exports.getAllProperties = (req, res) => {
  Property.find({})
    .then(properties => {
      const msg = {
        success: true,
        message: "All properties retrieved successfully",
        data: properties,
        status: 200
      };
      return res.json(msg);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve properties",
        status: 500
      });
    });
};


exports.getLeaseProperty = (req, res) => {
  console.log("dss",req.body)
  Property.find( req.body )
    .then(properties => {
      const msg = {
        success: true,
        message: "Properties retrieved successfully",
        data: properties,
        status: 200
      };
      return res.json(msg);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve properties",
        status: 500
      });
    });
};

exports.searchproperty = async (req, res) => {
  try {
      const user = await Property.findOne({
          $or: [
              { Title: req.body.Title },
             
          ]
      });
      if (!user) {
          return res.status(404).json({
              success: "false",
              message: "property not found",
              Status: 404,
          });
      }
      const msg = {
          success: "true",
          message: "property retrieved successfully",
          data: {
              id: user._id,
              Price: user.Price,
              Units: user.Units,
              YearBuilt: user.YearBuilt,
              Title: user.Title,
              Location: user.Location,
              
          },
          Status: 200,
      };
      return res.json(msg);
  } catch (err) {
      return res.status(500).json({
          success: "false",
          message: "Failed to return",
          Status: 500,
      });
  }
};

exports.getLeaseDue = (req, res) => {
  const { currentDate } = req.body;
  const currentDateObj = new Date(currentDate);
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  Property.find({
    LeaseExpiringOn: { $lt: currentDate } // expired leases
  })
    .then(properties => {
      console.log("Properties found:", properties);
      const msg = {
        success: true,
        message: "Properties retrieved successfully",
        data: properties,
        status: 200
      };
      return res.json(msg);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve properties",
        status: 500
      });
    });
};

