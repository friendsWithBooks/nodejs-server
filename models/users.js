// grab the things we need
var mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
var Schema = mongoose.Schema
var Currency = mongoose.Types.Currency

/* Book Schema */
var bookSchema = new Schema({
  _id : {type : String, required : true, unique : true},
  rating: { type: Number, min: 1, max: 5 },
  title: { type: String, required: true },
  author: { type: String, required: true },
  image : {type: String },
  availability : { type: String, required: true, default:'free' }
}, {
  timestamps: true
})

var lentSchema = new Schema({
  _id : {type : String, required : true, unique : true},
  title: { type: String, required: true },
  author: { type: String, required: true },
  image : {type: String },
  toId : { type: String, required : true}
}, {
  timestamps: true
})

var borrowSchema = new Schema({
  _id : {type : String, required : true, unique : true},
  title: { type: String, required: true },
  author: { type: String, required: true },
  image : {type: String },
  fromId : { type: String, required : true}
}, {
  timestamps: true
})

/* User Schema */
var userSchema = new Schema({
  _id : { type : String, required : true, unique : true},
  token : { type : String, required : true},
  name: { type: String, required: true },
  profilePic: { type: String, default: '' },
  aboutMe: { type: String, default: '' },
  location : { type : [Number], index : '2dsphere' },
  wishlist : [bookSchema],
  myRacks : [bookSchema],
  booksLent : [lentSchema],
  booksBorrowed : [borrowSchema]
}, {
  timestamps: true
})

// the schema is useless so far
// we need to create a model using it
var Users = mongoose.model('User', userSchema)

// make this available to our Node applications
module.exports = Users
