var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')

var routes = require('./routes/index')
var users = require('./routes/users')
var wishlist = require('./routes/wishlist')
var myRacks = require('./routes/myRacks')
var booksBorrowed = require('./routes/booksBorrowed')
var booksLent = require('./routes/booksLent')
var borrowBook = require('./routes/borrowBook')
var returnBook = require('./routes/returnBook')
var location = require('./routes/location')

var app = express() 
app.use(cors())
// mongoose setup
var url = 'mongodb://admin:adminlogin@ds135800.mlab.com:35800/fwbdb'

var options = { 
                server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } 
              }; 
mongoose.connect(url,options)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)
app.use('/wishlist', wishlist)
app.use('/myRacks', myRacks)
app.use('/booksBorrowed', booksBorrowed)
app.use('/booksLent', booksLent)
app.use('/borrowBook', borrowBook)
app.use('/returnBook', returnBook)
app.use('/location', location)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
