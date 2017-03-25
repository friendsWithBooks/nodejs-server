var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var returnRouter = express.Router()

returnRouter.use(bodyParser.json())


returnRouter
  .route('/')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .post(function (req, res, next) {
  
    Users.update( {"_id" : req.body.toId, "myRacks._id":req.body.bokId}, 
        { "$set" : {
            "myRacks.$.availability" : "free"
        } },
        function(err, result){
          if(!err) console.log("Changed the availability in myRacks")
        }   
     )

    
    Users.findByIdAndUpdate(req.body.toId,{$pull: {booksLent : { "_id" : req.body.bookId}}} , function (err, User) {
            console.log("Pulled book from lenders booksLent")
    })
     
    Users.findByIdAndUpdate(req.body.fromId,{$push: {booksBorrowed : {"_id" : req.body.bookId}} }, function (err, from) {
            console.log("Pulled book from borrowers booksBorrowed")
    })
    
  })

module.exports = returnRouter
