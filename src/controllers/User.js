const config = require("../config/auth");
const bcrypt = require('bcrypt');
BCRYPT_SALT = 10;
var express = require('express');
const User = require("../model/User");
const RefreshToken = require("../model/RefreshToken");
const sendEmail = require("../Helpers/SendEmail");
const jwt = require("jsonwebtoken");
 const crypto = require("crypto");
 const Joi = require("joi");





 exports.login = async (req, res) => {
  const username = 'admin';
  const password = 'test123';

  try {
    // Check if the username and password are correct
    if (req.body.Username === username && req.body.Password === password) {
      console.log(username)
      console.log(req.body.Password)
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
 // Create a new user instance and save it to the database
 const user = new User({
       
  Username: username,
  Password: hashedPassword,
});
      // Create a new user instance and save it to the database
      User.create({Username:username,Password:hashedPassword}).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log("ds",err)
      })
      console.log(user.Username)

      // Create access and refresh tokens
      let token = jwt.sign({ username }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      // Return access and refresh tokens
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          username: user.Username,
          password: user.Password,
          accessToken: token,
          refreshToken: refreshToken,
        }
      });
    } else {
      // If the credentials are incorrect, return an error message
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    // If there's an error, return an error message
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




exports.requestPasswordReset = async (req, res) => {
  const user = await User.findOne({ Username: req.body.Username });
  console.log("ayesha", user);
  if (!user) throw new Error("User does not exist");

  let token = await RefreshToken.findOne({ userId: user._id });
  console.log(token);
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hashSync(resetToken, 10);

  const refreshtoken = await new RefreshToken({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  });
  await refreshtoken.save();
  console.log(refreshtoken);

  const link = `http://localhost:3000/passwordReset?token=${resetToken}&id=${user._id}`;
  console.log("ayesha", link);
  sendEmail(
    user.email,
    "Password Reset Request",
    {
      username: user.username,
      link: link,
    },
    "./templates/requestResetPassword.handlebars"
  );

  res.send({
    success: "true",
    message: "reset password link sent successfully",
    data: {
      link: link,
      username: user.Username,
    },
    Status: 200,
  });
  return { link };
};


exports.resetPassword = async (req, res) => {
  let passwordResetToken = await RefreshToken.findOne({
    userId: req.body.userId,
  });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  console.log("parsa", passwordResetToken);
  const isValid = await bcrypt.compare(
    req.body.token,
    passwordResetToken.token
  );
  console.log(isValid);
  if (!isValid) {
    throw new Error("Invalid ");
  } else {
    const hash = await bcrypt.hashSync(req.body.Password, 8);
    await User.updateOne(
      { _id: req.body.userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: req.body.userId });
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        username: user.username,
      },
      "./templates/resetPassword.handlebars"
    );
    await passwordResetToken.deleteOne();

    res.send({
      success: "true",
      message: "Password Reset Successfully",
      data: user,
      Status: 200,
    });
    return true;
  }
};


exports.changepasswordwithcurrentpassword = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
      Password: Joi.string().required(),
      newpassword: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.id);
    console.log(req.body.id);
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid user ID", Status: 400 });

    const passwordMatch = await bcrypt.compareSync(
      req.body.Password,
      user.Password
    );
    if (!passwordMatch)
      return res.send({
        success: false,
        message: "Incorrect old password",
        Status: 400,
      });

    user.password = bcrypt.hashSync(req.body.newpassword, 8);
    await user.save();

    res.send({
      success: true,
      message: "Password changed successfully",
      data: user,
      Status: 200,
    });
  } catch (error) {
    res.status(500).send("An error occurred");
    console.log(error);
  }
};
