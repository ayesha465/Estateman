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



 exports.adduser = async (req, res) => {
  const { Username, Email, Contact, Address, CNIC, Password, ConfirmPassword, rights } = req.body;

  if (Password !== ConfirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password do not match",
      status: 400
    });
  }

  const user = new Users({
    Username,
    Email,
    Contact,
    Address,
    CNIC,
    Password,
    ConfirmPassword,
    rights
  });

  try {
    const savedUser = await user.save();
    const msg = {
      success: true,
      message: "User added successfully",
      data: {
        id: savedUser._id,
        Username: savedUser.Username,
        Email: savedUser.Email,
        Contact: savedUser.Contact,
        Address: savedUser.Address,
        Cnic: savedUser.Cnic,
        Password: savedUser.Password,
        ConfirmPassword: savedUser.ConfirmPassword,
        rights: savedUser.rights
      },
      status: 200
    };
    return res.json(msg);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to add user",
      status: 500
    });
  }
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
          Contact: user.Contact,
          CNIC: user.CNIC,
          Password:user.Password,
          ConfirmPassword:user.ConfirmPassword
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
            Contact: user.Contact,
          
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



  exports.editUser = (req, res) => {
    const { Email, Contact, Address, CNIC, Password, ConfirmPassword } = req.body;
    const { id } = req.query;
  
    if (Password !== ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
        status: 400
      });
    }
  
    Users.findById(id)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
            status: 404
          });
        }
  
        user.Email = Email;
        user.Contact = Contact;
        user.Address = Address;
        user.CNIC = CNIC;
        user.Password = Password;
        user.ConfirmPassword = ConfirmPassword;
  
        return user.save();
      })
      .then(updatedUser => {
        const msg = {
          success: true,
          message: "User edited successfully",
          data: {
            id: updatedUser._id,
            Username: updatedUser.Username,
            Email: updatedUser.Email,
            Contact: updatedUser.Contact,
            Address: updatedUser.Address,
            CNIC: updatedUser.CNIC,
            Password: updatedUser.Password,
            ConfirmPassword: updatedUser.ConfirmPassword
          }
        };
        return res.json(msg);
      })
      .catch(err => {
        return res.status(500).json({
          success: false,
          message: "Failed to edit user",
          status: 500
        });
      });
  };

  exports.deleteUser = async (req, res) => {
    try {
      const result = await Users.deleteOne({ _id: req.query.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          status: 404
        });
      }
      return res.json({
        success: true,
        message: "User deleted",
        data: result,
        status: 200
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Failed to delete user",
        status: 500
      });
    }
  };


  exports.searchuser = async (req, res) => {
    try {
        const user = await Users.findOne({
            $or: [
                { Username: req.query.Username },
                { Email: req.query.Email }
            ]
        });
        if (!user) {
            return res.status(404).json({
                success: "false",
                message: "User not found",
                Status: 404,
            });
        }
        const msg = {
            success: "true",
            message: "Profile retrieved successfully",
            data: {
                id: user._id,
                Username: user.Username,
                Email: user.Email,
                Address: user.Address,
                Contact: user.Contact,
                CNIC: user.CNIC,
                Password: user.Password,
                ConfirmPassword: user.ConfirmPassword
            },
            Status: 200,
        };
        return res.json(msg);
    } catch (err) {
        return res.status(500).json({
            success: "false",
            message: "Failed to return",
            Status: 500,
        });
    }
};
  