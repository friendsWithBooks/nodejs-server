var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Users = require('./../models/users')

var friendsRouter = express.Router()

friendsRouter.use(bodyParser.json())

/* Route '/' */

var https = require('https');
var facebook = require('facebook-js')
var getFbData = function(accessToken, apiPath, callback) {
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: apiPath + '?access_token=' + accessToken, //apiPath example: '/me/friends'
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('error from facebook.getFbData: ' + e.message)
    });

    request.end();
}

/*
getFbData('EAAaabAP9eDABAHx6lQ2Cd0RJmRF0A1geCIOQp2vUVBPpLRXi3frfu5tbVlsWLbEIwxvaQsw9WbqM1fkQiAD0RgGBIQfnDlZCjhz3I6Bg6mQwleZCRKopdZCQF4A4GeuDsMBwtSn4J5SUuoBzqwbEEqKdNH8ZCYO1RYWebenp9Y5WbYQAWo8amd7CvVSmOd8ZD', '/1147726995338533/friends', function(data){
        var x = JSON.parse(data).data
        console.log(x)
        for(var i in x){
            x[i].imageUrl = String('https://graph.facebook.com/'+x[i].id+'/picture?type=small')
        }
        console.log(x)
});
*/


friendsRouter
  .route('/:userId')

  .post(function (req, res, next) {
    getFbData(req.body.userAccessToken, '/'+req.params.userId+'/friends', function(data){
        var x = JSON.parse(data).data
        
        for(var i in x){
            x[i].imageUrl = String('https://graph.facebook.com/'+x[i].id+'/picture?type=small')
        }
        
        res.json(x)
    })
  })



module.exports = friendsRouter