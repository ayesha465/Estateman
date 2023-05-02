const jwt = require("jsonwebtoken");
const config = require("../config/auth");
//const db = require("../model");
//const User = db.user;
//const Role = db.role;
// const payload = {};
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log("ayesha", token);
    if (err) {
      return res.status(401).send({
        message: " Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
module.exports = verifyToken;