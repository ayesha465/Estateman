const config = require("../config/auth");
const bcrypt = require('bcrypt');

BCRYPT_SALT = 10;
//const upload = require (.../middleware/upload)
//const multer  = require('multer')
//const upload = multer({ dest: 'uploads/', limits: { files: 10 } }).array('images', 10);
 // Specify the destination folder for uploaded files
const fs = require('fs');
const path = require('path');
 const Property = require("../model/Property");
 //const folderPath = 'C:/Users/wtics/Downloads/uploads';
 const formparser=require('express-fileupload')


 // Configure multer to handle file uploads from a specific folder
 



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
       const user = await Property.create(req.body)
        console.log('y',req.body)
        const msg = {
            success: "true",
            message: "property added successfully",
            data: user,
            Status: 201,
        };
        return res.status(201).json(msg);
    } catch (err) {
      console.log(err)
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
    const property = await Property.findByIdAndUpdate(id, req.body);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
        status: 404,
      });
    }

    if (req.files && req.files.imagePath && req.files.imagePath.length > 0) {
      const imageUrls = [];
      // let count = 0
      console.log(req.files.imagePath.length)
      const uploadPromises = req.files.imagePath.map((image,idx) => {
        // console.log(req.files)
        const imageExtension = path.extname(image.name);
        const imagePath = path.join(__dirname, '../uploads', `${idx}${imageExtension}`);

        return new Promise((resolve, reject) => {
          image.mv(imagePath, async (err) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              const imageUrl = `images/${property.id}${imageExtension}`;
              imageUrls.push(imageUrl);
              resolve();
            }
          });
        });
      });

      await Promise.all(uploadPromises);

      if (property.PropertyDetails) {
        property.PropertyDetails.imagePath = imageUrls;
      }

      if (property.AddHistory) {
        property.AddHistory.imagePath = imageUrls;
      }

      await property.save();

      const msg = {
        success: true,
        message: 'Property updated successfully',
        data: property,
        status: 200,
      };

      return res.status(200).json(msg);
    } else {
      const msg = {
        success: true,
        message: 'Property updated successfully',
        data: property,
        status: 200,
      };

      return res.status(200).json(msg);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update Property',
      status: 500,
    });
  }
};

exports.getPropertyImageUrls = async (req, res) => {
  try {
    const id = req.query.id;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
        status: 404,
      });
    }

    const propertyDetailsImageUrls = property.PropertyDetails?.imagePath ?? [];
    const addHistoryImageUrls = property.AddHistory?.imagePath ?? [];

    const publicPropertyDetailsImageUrls = propertyDetailsImageUrls.map((imagePath) => {
      return `http://localhost:3000/${imagePath}`; // Update the base URL here
    });

    const publicAddHistoryImageUrls = addHistoryImageUrls.map((imagePath) => {
      return `https://localhost:3000/${imagePath}`; // Update the base URL here
    });

    const msg = {
      success: true,
      message: 'Image URLs retrieved successfully',
      data: {
        propertyDetails: publicPropertyDetailsImageUrls,
        addHistory: publicAddHistoryImageUrls,
      },
      status: 200,
    };

    return res.status(200).json(msg);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve image URLs',
      status: 500,
    });
  }
};

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
  Property.find( req.query )
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
              { Title: req.query.Title},
             
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
          data: user,
          Status: 200,
      };
      return res.json(msg);
  } catch (err) {
    console.log(err)
      return res.status(500).json({
          success: "false",
          message: "Failed to return",
          Status: 500,
      });
  }
};





exports.getLeaseDue = (req, res) => {
  const { currentDate } = req.query;

  Property.find({
    $or: [
      {
        "AddHistory.LeaseExpiringOn": {
          $lt: new Date(currentDate)
        }
      },
      {
        "AddHistory.LeaseExpiringOn": {
          $gte: new Date(currentDate),
          $lte: new Date(currentDate).setMonth(new Date(currentDate).getMonth() + 1)
        }
      }
    ]
  })
    .then(properties => {
      const expiringProperties = properties.map(property => {
        const leaseExpiringOn = property.AddHistory.LeaseExpiringOn;
        const expirationDate = new Date(leaseExpiringOn);

        if (expirationDate.getTime() < new Date(currentDate).getTime()) {
          return {
            ...property.toObject(),
            message: "Property has expired."
          };
        } else {
          return {
            ...property.toObject(),
            message: "Property is expiring within one month."
          };
        }
      });

      const msg = {
        success: true,
        message: "Properties retrieved successfully",
        data: expiringProperties,
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

exports.getUnitSold = (req, res) => {
  Property.find(req.query)
    .then(properties => {
      if (properties.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No properties found with ContractType 'Rent'",
          status: 404
        });
      }

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






































