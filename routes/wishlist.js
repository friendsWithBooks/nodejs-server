var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var wishlistRouter = express.Router()

wishlistRouter.use(bodyParser.json())

/* Route '/' */

wishlistRouter
  .route('/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(function (req, res, next) {
    Users.findById(req.params.userId, function (err, user) {
      res.json(user.wishlist)
    })
  })

/* Route '/add/:userId' */

wishlistRouter
  .route('/add/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .post(function (req, res, next) {
    console.log(req.body)
    Users.findByIdAndUpdate(req.params.userId,{$addToSet: {"wishlist" : req.body}}, function (err, book) {
       res.json(book)
    })
  })


wishlistRouter
  .route('/remove/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .delete(function (req, res, next) {
    console.log(req.body)
    Users.findByIdAndUpdate(req.params.userId,{$pull: {"wishlist" : req.body}}, function (err, book) {
       res.json(book)
    })
  })


module.exports = wishlistRouter
