var User = require('../models/User')
const { getUsersFromAuth0 } = require('../utils/get_users_from_auth0')

exports.get_full_list = function(req, res) {
  User.find({})
    .populate('teams')
    .exec((err, data) => {
      if (err) { res.send(err) }

      res.json(data)
    })
}

exports.find_by_auth0id = function(req, res) {
  console.log("finding", req.body)
  User.findOneAndUpdate({auth0id: req.body.sub}, {$set: {email: req.body.email, name: req.body.name, image_url: req.body.picture}}, {upsert: true, 'new': true})
    .populate('teams')
    .populate('pending_teams')
    .exec((err, results) => {
      if (err) { res.send(err) }
      console.log(results)
      res.json(results)
    })
}

exports.update_by_id = function(req, res) {
  const {data} = req.body

  console.log(req.body)
  User.findOneAndUpdate({_id: data._id}, {$set: {core_admin: data.core_admin}}, {new: true}, (err, data) => {
    if (err) { res.send(err) }
    console.log(data)
    res.json(data)
  })
}
