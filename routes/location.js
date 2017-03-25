var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var locationRouter = express.Router()

locationRouter.use(bodyParser.json())

/* Route '/' */

locationRouter
  .route('/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(function (req, res, next) {
    Users.findById(req.params.userId, function (err, user) {
      res.json(user.location)
    })
  })

/* Route '/add/:userId' */

locationRouter
  .route('/update/:userId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .put(function (req, res, next) {
    console.log(req.body)
    Users.findByIdAndUpdate(req.params.userId, {"location" : req.body.location }, function (err, user) {
       res.json(user)
    })
  })


locationRouter
  .route('/neighbours/')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .post(function (req, res, next) {
    console.log(req.body)
    Users.find( { "location" :
                            { $near :
                                { $geometry : {
                                                type : "Point" ,
                                                coordinates : req.body.location 
                                            } ,          ///// Has to be array
                                $maxDistance : req.body.maxDist }
                             } }, function(err,result){
                                 res.json(result)
                             } )
  })


module.exports = locationRouter
