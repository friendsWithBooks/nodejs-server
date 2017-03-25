var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var userRouter = express.Router()

userRouter.use(bodyParser.json())

/* Route '/' */

userRouter
  .route('/')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(function (req, res, next) {
    Users.find({}, function (err, users) {
      res.json(users)
    })
  })

  .post(function (req, res, next) {
    console.log(req.body)
    Users.create(req.body, function (err, user) {
      if(err) console.log("POST Error")
      res.json(user)
    })
  })

/* Route '/:dishId' */

userRouter
  .route('/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(function (req, res, next) {
    Users.findById(req.params.userId, function (err, user) {
      res.json(user)
    })
  })

  .put(function (req, res, next) {
    console.log(req.body)
    Users.findByIdAndUpdate(req.params.userId, req.body, function (err, user) {
       res.json(user)
    })
  })

  .delete(function (req, res, next) {
    Users.findByIdAndRemove(req.params.userId, function (err, user) {
      res.json(user)
    })
  })

module.exports = userRouter
