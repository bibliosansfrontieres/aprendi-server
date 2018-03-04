var Collection = require('../models/Collection');
var Team = require('../models/Team');

exports.create = function(req, res) {
  console.log(req.body)
  const {data, team} = req.body
  const collection = new Collection({...data, team:team})

  collection.save((err, data) => {
    if (err) { res.send({error: err}) }

    Team.findByIdAndUpdate(team, { $push: {collections: collection._id}})
      .exec((err, teamInfo) => {
        console.log(data)

      })

    res.json(data)
  })
};

exports.delete_by_id = function(req, res) {
  console.log(req.query)
  Collection.findByIdAndRemove(req.query, (err, data) => {
    if (err) { res.send({error: err}) }
    Team.findByIdAndUpdate(data.team, { $pull: {collections: data._id }})
      .exec((err, data) => {
        console.log(data)
        res.json(data)
      })
  })
};

exports.update_by_id = function(req, res) {
  console.log("this is the request")
  console.log(req.body)
  const {data} = req.body
  Collection.findByIdAndUpdate(data._id, {$set: data})
    .exec(function(err, data) {
      if (err) { res.send({error: err}) }
      res.json(data);

    });
};

exports.add_resource = function(req, res) {
  console.log(req.body)
  const {resourceId, parentId} = req.body
  Collection.findByIdAndUpdate(parentId, { $push: {resources: resourceId}})
    .exec((err, data) => {
      console.log("added to collection parent")
      res.json(data)
    })
};

exports.remove_resource = function(req, res) {
  console.log(req.body)
  const {resourceId, parentId} = req.body
  Collection.findByIdAndUpdate(parentId, { $pull: {resources: resourceId}})
    .exec((err, data) => {
      console.log("removed from collection")
      res.json(data)
    })
};

exports.find_by_url = function(req, res) {
  console.log("finding collection", req.query)
    Collection.findOne(req.query)
      .populate('team')
      .populate('subcollections')
      .populate('resources')
      .exec(function(err, data) {
        if (err) { res.send({error: err}) }
        res.json(data);

      });
};

exports.get_full_list = function(req, res) {
  console.log(req.query)
  Collection.find(req.query, (err, data) => {
    if (err) { res.send({error: err}) }
    res.json(data)
  })
};
