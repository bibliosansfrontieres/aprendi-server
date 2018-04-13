var User = require('../models/User')
var Team = require('../models/Team')
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

exports.user_make_core_admin = function(req, res) {
  const {data} = req.body

  console.log(req.body)
  User.findOneAndUpdate({_id: data._id}, {$set: {core_admin: data.core_admin, teams: [], pending_teams: []}}, (err, data) => {
    if (err) { res.send(err) }
    console.log(data)

    if (data.teams && data.teams.length > 0) {
      Team.update({_id: {$in: data.teams}}, { $pull: {users: data._id, pending_users: data._id}}, { multi: true})
        .exec((err, results) => {
          if (err) { res.send(err) }
          console.log(results)
          res.json(data)
        })
    } else {
      res.json(data)
    }
  })


}
