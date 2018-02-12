var Resource = require('../models/Resource');
var Subcollection = require('../models/Subcollection');
var Collection = require('../models/Collection');
var Team = require('../models/Team');

exports.create = function(req, res) {
  console.log(req.body)
  const {data, parent} = req.body
  const resource = new Resource(data)

  resource.save((err, data) => {
    if (err) { res.send(err) }
    // add to team
    if (parent.parentType === "collection") {
      Collection.findByIdAndUpdate(parent.parentId, { $push: {resources: resource._id}})
        .exec((err, data) => {
          console.log("added to collection parent")
        })
    } else {
      Subcollection.findByIdAndUpdate(parent.parentId, { $push: {resources: resource._id}})
        .exec((err, data) => {
          console.log("added to resource parent")
        })
    }

    res.json(data)
  })
};

// handle case where someone deletes resource that has children
exports.delete_by_id = function(req, res) {
  console.log(req.query)
  const {_id, parent_id, parent_type} = req.query
  Resource.findByIdAndRemove(_id, (err, data) => {
    if (err) { res.send(err) }

    if (parent_type == "collection") {
      Collection.findByIdAndUpdate(parent_id, { $pull: {resources: _id}})
        .exec((err, data) => {
          console.log("removed from collection parent")
        })
    } else {
      Subcollection.findByIdAndUpdate(parent_id, { $pull: {resources: _id}})
        .exec((err, data) => {
          console.log("removed from resource parent")
        })
    }

    res.json(data)
  })
};

exports.update_by_id = function(req, res) {
  console.log(req.body)
  const {data} = req.body
  Resource.findByIdAndUpdate(data._id, {$set: data}, (err, data) => {
    res.json(data)
  })
};

exports.find_by_id = function(req, res) {
    Resource.findOne(req.query)
      .exec(function(err, data) {
        if (err) { res.send(err) }
        res.json(data);
      });
};

exports.get_full_list = function(req, res) {
  console.log(req.query)
  Resource.find(req.query, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};
