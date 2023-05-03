const config = require("../config/auth");
const bcrypt = require('bcrypt');
BCRYPT_SALT = 10;
var express = require('express');

const RefreshToken = require("../model/RefreshToken");
const sendEmail = require("../Helpers/SendEmail");
const jwt = require("jsonwebtoken");
 const crypto = require("crypto");
 const Joi = require("joi");
 const mongoose = require("mongoose");
 const Users = require("../model/User");
 exports.adduser = (req, res) => {
    const user = new Users({
      Username: req.body.Username,
      Email: req.body.Email,
      contact: req.body.contact,
      Address: req.body.Address,
      cnic: req.body.cnic,
    });
    console.log("hhsj", user);
    user.save()
      .then((savedUser) => {
        console.log("request is incoming");
        return res.send({
          success: "true",
          message: "Registered Successfully",
          data: {
            id: savedUser._id,
            Username: savedUser.Username,
            Email: savedUser.Email,
            Address: savedUser.Address,
            contact: savedUser.contact,
          },
          Status: 200,
        });
      })
      .catch((err) => {
        return res.json({ success: false, message: err.message });
      });
  };

  exports.getUsers = async (req, res) => {
    try {
      const user = await Users.findById(req.query.id);
      const msg = {
        success: "true",
        message: "profile retrieved successfully",
        data: {
          id: user._id,
          Username: user.Username,
          Email: user.Email,
          Address: user.Address,
          contact: user.contact,
          cnic: user.cnic,
        },
        Status: 200,
      };
      return res.json(msg);
    } catch (err) {
      return res.status(500).json({
        success: "false",
        message: "Failed to return  ",
        Status: 500,
      });
    }
  };

  exports.getAllUsers = (req, res) => {
    Users.find({})
      .then(users => {
        const data = users.map(user => {
          return {
            id: user._id,
            Username: user.Username,
            Email: user.Email,
            Address: user.Address,
            contact: user.contact,
            cnic: user.cnic
          };
        });
        const msg = {
          success: true,
          message: "Users retrieved successfully",
          data,
          status: 200
        };
        return res.json(msg);
      })
      .catch(err => {
        console.log("ayesha");
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve users",
          status: 500
        });
      });
  };