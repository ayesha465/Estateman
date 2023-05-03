var express = require('express');
var router = express.Router();
const authJwt = require("../middleware/User");
const controller = require("../controllers/admin");
router.post('/login',controller.login);
router.post(
    '/forgot-password',
    authJwt,
    controller.requestPasswordReset
  );
router.post("/password-reset", controller.resetPassword);
router.put(
    "/change-password",
    [authJwt],
    controller.changepasswordwithcurrentpassword
  );
module.exports = router;

