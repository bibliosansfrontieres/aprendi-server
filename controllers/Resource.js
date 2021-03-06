var Resource = require('../models/Resource')
var Subcollection = require('../models/Subcollection')
var Collection = require('../models/Collection')
var Team = require('../models/Team')

exports.create = function(req, res) {
  const {data, parent, team} = req.body
  const resource = new Resource(data)

  resource.save((err, data) => {
    if (err) { res.send(err) }

    if (team) {
      Team.findByIdAndUpdate(team, { $push: {resources: resource._id}})
        .exec((err, data) => {
        })
    }
    if (parent) {
      if (parent.parentType === "collection") {
        Collection.findByIdAndUpdate(parent.parentId, { $push: {resources: resource._id}})
          .exec((err, data) => {
          })
      } else {
        Subcollection.findByIdAndUpdate(parent.parentId, { $push: {resources: resource._id}})
          .exec((err, data) => {
          })
      }
    }

    res.json(data)
  })
}

// handle case where someone deletes resource that has children
exports.delete_by_id = function(req, res) {
  const {_id, parent_id, parent_type} = req.query
  Resource.findByIdAndRemove(_id, (err, data) => {
    if (err) { res.send(err) }

    if (data && data.team) {
      Team.findByIdAndUpdate(data.team, { $pull: {resources: _id}})
        .exec((err, data) => {
        })
    }

    res.json(data)
  })
}

exports.update_by_id = function(req, res) {
  const {data} = req.body
  Resource.findByIdAndUpdate(data._id, {$set: data}, (err, data) => {
    res.json(data)
  })
}

exports.find_by_id = function(req, res) {
    Resource.findOne(req.query)
      .exec(function(err, data) {
        if (err) { res.send(err) }
        res.json(data)
      })
}

exports.get_full_list = function(req, res) {
  Resource.find(req.query)
    .populate('team')
    .exec((err, data) => {
      if (err) { res.send(err) }
      res.json(data)
    })
}
