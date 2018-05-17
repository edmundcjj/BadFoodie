const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  restaurant:{
    type: String,
    required: true,
  },
  restaurantOwner:{
    type: String,
    required: true,
  },
  cuisine:{
    type: String,
    required: true,
  },
  avgPrice:{
    type: String,
    required: true,
  },
  review:{
    type: String,
    default: 'n/a'
  },
  rating:{
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  ownerId:{
    type: String,
    required: true,
  }
},{timestamps: true})


const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review }
