var Collection = require('../models/Collection')
var Team = require('../models/Team')

exports.create = function(req, res) {
  const {data, team} = req.body
  const collection = new Collection({...data, team:team})

  collection.save((err, data) => {
    if (err) { res.send({error: err}) }

    Team.findByIdAndUpdate(team, { $push: {collections: collection._id}})
      .exec((err, teamInfo) => {})

    res.json(data)
  })
}

exports.delete_by_id = function(req, res) {
  Collection.findById(req.query, (err, doc) => {
    if (err) { res.send({error: err}) }

    doc.remove()
    Team.findByIdAndUpdate(doc.team, { $pull: {collections: doc._id }})
      .exec((err, data) => {
        res.json(data)
      })
  })
}

exports.update_by_id = function(req, res) {
  const {data} = req.body
  Collection.findByIdAndUpdate(data._id, {$set: data})
    .exec(function(err, data) {
      if (err) { res.send({error: err}) }
      res.json(data)

    })
}

exports.add_resource = function(req, res) {
  const {resourceId, parentId} = req.body
  Collection.findByIdAndUpdate(parentId, { $push: {resources: resourceId}})
    .exec((err, data) => {
      res.json(data)
    })
}

exports.remove_resource = function(req, res) {
  console.log(req.body)
  const {resourceId, parentId} = req.body
  Collection.findByIdAndUpdate(parentId, { $pull: {resources: resourceId}})
    .exec((err, data) => {
      res.json(data)
    })
}

exports.find_by_url = function(req, res) {
    Collection.findOne(req.query)
      .populate('team')
      .populate('subcollections')
      .populate('resources')
      .exec(function(err, data) {
        if (err) { res.send({error: err}) }
        res.json(data)

      })
}

exports.get_full_list = function(req, res) {
  console.log(req.query)
  Collection.find(req.query)
    .sort( { title: 1 } )
    .populate('team')
    .exec((err, data) => {
      if (err) { res.send({error: err}) }
      res.json(data)
    })
}
