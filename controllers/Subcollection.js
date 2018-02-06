var Subcollection = require('../models/Subcollection');
var Team = require('../models/Team');

exports.create = function(req, res) {
  const subcollection = new Subcollection(req.body)

  subcollection.save((err, data) => {
    if (err) { res.send(err) }

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
