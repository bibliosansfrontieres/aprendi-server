var Subcollection = require('../models/Subcollection');
var Collection = require('../models/Collection');
var Team = require('../models/Team');

exports.create = function(req, res) {
  console.log(req.body)
  const {data, parent} = req.body
  const subcollection = new Subcollection(data)

  subcollection.save((err, data) => {
    if (err) { res.send(err) }

    if (parent.parentType === "collection") {
      Collection.findByIdAndUpdate(parent.parentId, { $push: {subcollections: subcollection._id}})
        .exec((err, data) => {
          console.log("added to collection parent")
        })
    } else {
      Subcollection.findByIdAndUpdate(parent.parentId, { $push: {subcollections: subcollection._id}})
        .exec((err, data) => {
          console.log("added to subcollection parent")
        })
    }

    res.json(data)
  })
};

// handle case where someone deletes subcollection that has children
exports.delete_by_id = function(req, res) {
  console.log("DELETING SUBCOLLECTION")
  console.log(req.query)
  const {_id, parent_id, parent_type} = req.query
  Subcollection.findByIdAndRemove(_id, (err, data) => {
    if (err) { res.send(err) }

    if (parent_type == "collection") {
      Collection.findByIdAndUpdate(parent_id, { $pull: {subcollections: _id}})
        .exec((err, data) => {
          console.log("removed from collection parent")
        })
    } else {
      Subcollection.findByIdAndUpdate(parent_id, { $pull: {subcollections: _id}})
        .exec((err, data) => {
          console.log("removed from subcollection parent")
        })
    }

    res.json(data)
  })
};

exports.update_by_id = function(req, res) {
  console.log(req.body)
  const {data} = req.body
  Subcollection.findByIdAndUpdate(data._id, {$set: data}, (err, data) => {
    res.json(data)
  })
};

exports.add_resource = function(req, res) {
  console.log(req.body)
  const {resourceId, parentId} = req.body
  Subcollection.findByIdAndUpdate(parentId, { $push: {resources: resourceId}})
    .exec((err, data) => {
      console.log("added to subcollection parent")
      res.json(data)
    })
};

exports.remove_resource = function(req, res) {
  console.log(req.body)
  const {resourceId, parentId} = req.body
  Subcollection.findByIdAndUpdate(parentId, { $pull: {resources: resourceId}})
    .exec((err, data) => {
      console.log("added to subcollection parent")
      res.json(data)
    })
};

exports.find_by_url = function(req, res) {
    Subcollection.findOne(req.query)
      .exec(function(err, data) {
        if (err) { res.send(err) }
        res.json(data);
      });
};

exports.get_full_list = function(req, res) {
  console.log(req.query)
  Subcollection.find(req.query, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};
