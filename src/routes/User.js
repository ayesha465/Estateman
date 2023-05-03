var express = require('express');
var router = express.Router();
const authJwt = require("../middleware/User");
const controller = require("../controllers/User");

router.post(
    '/ADDUSER',
    
    controller.adduser
  );
  router.get(
    '/USER',
    
    controller.getUsers
  );
  router.get(
    '/ALLUSER',
    
    controller.getAllUsers
  );
  module.exports = router;