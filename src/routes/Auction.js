var express = require('express');
var router = express.Router();

const controller = require("../controllers/Auction");

router.post(
    '/ADDAuction',
 
    controller.addauction
  );
  router.get(
    '/viewAllAuction',
 
    controller.getAllAuction
  );
  module.exports = router;