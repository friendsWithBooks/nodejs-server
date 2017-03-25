var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var myRacksRouter = express.Router()

myRacksRouter.use(bodyParser.json())

/* Route '/' */

myRacksRouter
  .route('/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(function (req, res, next) {
    Users.findById(req.params.userId, function (err, user) {
      res.json(user.myRacks)
    })
  })

/* Route '/add/:userId' */

myRacksRouter
  .route('/add/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .post(function (req, res, next) {
    console.log(req.body)
    Users.findByIdAndUpdate(req.params.userId,{$addToSet: { "myRacks" : req.body}}, function (err, book) {
       res.json(book)
    })
  })


myRacksRouter
  .route('/remove/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .delete(function (req, res, next) {
    console.log(req.body)
    Users.findByIdAndUpdate(req.params.userId,{$pull: {"myRacks" : req.body}}, function (err, book) {
       res.json(book)
    })
  })


module.exports = myRacksRouter
