var Subcollection = require('../models/Subcollection');
var Collection = require('../models/Collection');
var Team = require('../models/Team');

exports.create = function(req, res) {
  console.log(req.body)
  const {data, parent} = req.body
  const subcollection = new Subcollection(req.body.data)

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

exports.delete_by_id = function(req, res) {
  console.log(req.query)
  Subcollection.findByIdAndRemove(req.query, (err, data) => {
    if (err) { res.send(err) }
    Team.findByIdAndUpdate(data.team, { $pull: {collections: data._id }})
      .exec((err, data) => {
        console.log(data)
        res.json(data)
      })
  })
};

exports.update_by_id = function(req, res) {
  console.log(req.body)
  Subcollection.findByIdAndUpdate(req.body._id, {$set: req.body}, (err, data) => {
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
