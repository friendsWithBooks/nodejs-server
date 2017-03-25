var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var booksBorrowedRouter = express.Router()

booksBorrowedRouter.use(bodyParser.json())

/* Route '/' */

booksBorrowedRouter
  .route('/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(function (req, res, next) {
    Users.findById(req.params.userId, function (err, user) {
      res.json(user.booksBorrowed)
    })
  })


module.exports = booksBorrowedRouter