var Resource = require('../models/Resource');

exports.create = function(req, res) {
  const resource = new Resource(req.body)

  resource.save((err, data) => {
    if (err) { res.send(err) }

    res.json(data)
  })
};

exports.delete_by_id = function(req, res) {
  console.log(req.query)
  Resource.findByIdAndRemove(req.query, (err, data) => {
    if (err) { res.send(err) }

  })
};

exports.update_by_id = function(req, res) {
  console.log(req.body)
  Resource.findByIdAndUpdate(req.body._id, {$set: req.body}, (err, data) => {
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
