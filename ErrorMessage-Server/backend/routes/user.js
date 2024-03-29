const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json ({
            message: 'User Created',
            result: result
          });
        })
        .catch( err => {
          res.status(500).json({
            message: 'Invalid authentication credentials!'
          });
        });
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUSer;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed"
        });
      }
      fetchedUSer = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication Failed"
        });
      }
      const token = jwt.sign({ email: fetchedUSer.email, userId: fetchedUSer._id},
        'secret_this_should_be_longer',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUSer._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    });
});

module.exports = router;
