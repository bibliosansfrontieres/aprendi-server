var Collection = require('../models/Collection');
var Team = require('../models/Team');

exports.create = function(req, res) {
  console.log(req.body)
  const {data, team} = req.body
  const collection = new Collection({...data, team:team})

  collection.save((err, data) => {
    if (err) { res.send(err) }

    Team.findByIdAndUpdate(team, { $push: {collections: collection._id}})
      .exec((err, data) => {
        console.log(data)

      })

    res.json(data)
  })
};

exports.delete_by_id = function(req, res) {
  console.log(req.query)
  Collection.findByIdAndRemove(req.query, (err, data) => {
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
  const {data} = req.body
  Collection.findByIdAndUpdate(data._id, {$set: data}, (err, data) => {
    res.json(data)
  })
};

exports.find_by_url = function(req, res) {
    Collection.findOne(req.query)
      .populate('team')
      .populate('subcollections')
      .populate('resources')
      .exec(function(err, data) {
        if (err) { res.send(err) }
        res.json(data);

      });
};

exports.get_full_list = function(req, res) {
  console.log(req.query)
  Collection.find(req.query, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};
