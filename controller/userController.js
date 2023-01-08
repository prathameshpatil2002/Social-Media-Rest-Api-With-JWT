const User = require('../models/Users');

exports.getUser = (req, res) => {
    User.findById(req.user._id)
      .then(doc => res.status(200).json({
          status : 'success',
          data : {
              name : doc.name,
              NumberOfFollowers : doc.numFollowers,
              NumberOfFollowings : doc.numFollowings
          }
      }))
      .catch(err => res.status(404).json(err));
};

exports.addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {$push: {following: req.params.id}, $inc : {'numFollowings' : 1}}, {new: true})
    .then(result => next())
    .catch(err => res.status(400).json(err));
};

  exports.follow = (req, res, next) => {
    if(req.params.id == req.user._id){
      res.status(400).json({
        status : 'success',
        data : 'You cannot follow yourself..'
      });

      return;
    }
    User.findByIdAndUpdate(req.params.id, {$push: {followers: req.user._id}, $inc : {'numFollowers' : 1}}, {new: true})
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .then(result => res.status(200).json({
          status: 'success',
          data : {
              data : result
          }
      }))
      .catch(err => res.status(400).json(err));
};

exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {$pull: {following: req.params.id}, $inc : {'numFollowings' : -1}}, {new: true})
    .then(result => next())
    .catch(err => res.status(400).json(err));
};


  exports.unfollow = (req, res) => {
    if(req.params.id == req.user._id){
      res.status(400).json({
        status : 'success',
        data : 'You cannot unfollow yourself..'
      });

      return;
    }
    User.findByIdAndUpdate(req.params.id, {$pull: {followers: req.user._id}, $inc: {'numFollowers' : -1}}, {new: true})
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json(err));
};