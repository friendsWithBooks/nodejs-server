var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var borrowRouter = express.Router()

borrowRouter.use(bodyParser.json())


borrowRouter
  .route('/')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .post(function (req, res, next) {
  
    Users.update( {"_id" : req.body.fromId, "myRacks._id":req.body.bokId}, 
        { "$set" : {
            "myRacks.$.availability" : "lent"
        } },
        function(err, result){
          if(!err) console.log("Changed the availability in myRacks")
        }   
     )

    
    Users.findByIdAndUpdate(req.body.fromId,{$push: {booksLent : {
        "_id" : req.body.bookId,
        "title" : req.body.title,
        "author" : req.body.author,
        "toId" : req.body.toId
      }}} , function (err, from) {
            console.log("Pushed book to lenders booksLent")
    })
     
    Users.findByIdAndUpdate(req.body.toId,{$push: {booksBorrowed : {
        "_id" : req.body.bookId,
        "title" : req.body.title,
        "author" : req.body.author,
        "fromId" : req.body.fromId
      }} }, function (err, from) {
            console.log("Pushed book to borrowers booksBorrowed")
    })
    
  })

module.exports = borrowRouter
