//const path = require('path');
 const Auctions = require("../model/Auction");

 const path = require('path');

 exports.addauction = async (req, res) => {
  try {
   
    let imagePaths = [];
    if (req.files && req.files.imagePath && req.files.imagePath.length > 0) {
      // Handle image file upload
      imagePaths = req.files.imagePath.map((image) => {
        const imageExtension = path.extname(image.name);
        const imagePath = `../uploads/${Date.now()}${imageExtension}`; // Generate a unique filename
        image.mv(imagePath);
        return imagePath;
      });
    }
    console.log('imagePaths:', imagePaths);

    const auctionData = {
      ...req.body
    };

    const user = await Auctions.create(auctionData);
    user.imagePath = imagePaths;
    await user.save();

    const msg = {
      success: true,
      message: "Auctions added successfully",
      data: user,
      status: 201,
    };
    return res.status(201).json(msg);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to Add",
      status: 500,
    });
  }
};

exports.getAllAuction = (req, res) => {
    Auctions.find({})
    .then(actions => {
      const data = actions.map(auction => {
        return auction;
      });
        const msg = {
          success: true,
          message: "Auction history retrieved successfully",
          data,
          status: 200
        };
        return res.json(msg);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve auction history",
          status: 500
        });
      });
  };