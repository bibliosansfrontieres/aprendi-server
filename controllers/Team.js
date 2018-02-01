var Team = require('../models/Team');

exports.create = function(req, res) {
  console.log(req.body)
  Team.create(req.body, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};

exports.delete = function(req, res) {
  console.log("deleting!!", req.body)

  Team.findByIdAndRemove(req.body._id, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};

exports.get_full_list = function(req, res) {
  Team.find({}, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};
