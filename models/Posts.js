const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  body: {
    type: String, 
    required: true
  },
  user: {
    type: ObjectId, 
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [{
    type: ObjectId, 
    ref: 'User'
  }],
  comments: [{
    comment: String,
    createdAt: {type: Date, default: Date.now()},
    commenter: {type: ObjectId, ref: 'User'}
  }],
  numLikes : {
    type : Number,
    default : 0
  },
  numComments : {
    type : Number,
    default : 0
  }
});


module.exports = mongoose.model('Post', postSchema, 'posts');



 