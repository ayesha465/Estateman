
 const Auctions = require("../model/Auction");

exports.addauction = async (req, res) => {
    try {
        if (req.body.Auctioneer && !['Bank', 'Government'].includes(req.body.Auctioneer)) {
            return res.status(400).json({
                success: false,
                message: `Invalid PropertyType value: ${req.body.Auctioneer}`,
                status: 400
            });
        }
        
        console.log("x",req.body)
       const user=await Auctions.create(req.body)
        
        const msg = {
            success: "true",
            message: "Auctions added successfully",
            data: user,
            Status: 201,
        };
        return res.status(201).json(msg);
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: "false",
            message: "Failed to Add",
            Status: 500,
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