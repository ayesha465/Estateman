var express = require('express');
var router = express.Router();
const authJwt = require("../middleware/User");
const controller = require("../controllers/Property");

router.post(
    '/ADDProperty',
    controller.addProperty
  );
  router.put(
    '/UpdateProperty',
    controller.updateProperty
  );
  router.get(
    '/ALLHistory',
    controller.getAllHistory
  );
  router.get(
    '/ALLProperties',
    controller.getAllProperties
  );
  router.get(
    '/AllLease',
    controller.getLeaseProperty
  );
  router.get(
    '/searchproperty',
    controller.searchproperty
  );
  router.get(
    '/LeaseDue',
    controller.getLeaseDue
  );
  router.get(
    '/UnitsSold',
    controller.getUnitSold
  );



module.exports = router;