var Team = require('../models/Team')
var User = require('../models/User')
// const { getTeamUsers } = require('../utils/get_team_users')

exports.create = function(req, res) {
  console.log(req.body)
  const {data} = req.body

  const team = new Team(data)
  team.save((err, data) => {
    if (err) { res.send({error: err}) }
     if (data.users && data.users.length > 0) {
       User.findByIdAndUpdate(data.users[0], { $addToSet: {teams: team._id}})
         .exec((err, data) => {
           console.log(data)
         })
     }
    res.json(data)
  })
}

exports.delete_by_id = function(req, res) {
  Team.findById(req.query, (err,doc) => {
    if (err) { res.send(err) }
    doc.remove()
    res.json(doc)
  })
}

exports.update_by_id = function(req, res) {
  const {data} = req.body

  console.log(req.body)
  Team.findByIdAndUpdate(data._id, {$set: data}, (err, data) => {
    res.json(data)
  })
}

exports.find_by_url = function(req, res) {
  console.log("finding", req.query)

  Team.findOne(req.query)
    .populate('collections')
    .populate('resources')
    .populate('users')
    .populate('pending_users')
    .exec((err, results) => {
      if (err) { res.send(err) }
      console.log(results)
      res.json(results)
      // let retObject = {}
      // retObject.team_id = results.team_id
      // retObject.team_name = results.team_name
      //
      // let getUsersPromise = getTeamUsers(results.team_id)
      // let getCollectionsPromise = getCollectionsByTeam(results.team_id)
      //
      // Promise.all([getUsersPromise, getCollectionsPromise]).then(([users, collections]) => {
      //   retObject.users = JSON.parse(users)
      //   retObject.collections = collections
      //   res.json(retObject)
      // })
    })
}

exports.get_full_list = function(req, res) {
  Team.find({})
    .sort( { team_name: 1 } )
    .populate('pending_users')
    .exec((err, data) => {
      if (err) { res.send(err) }
      res.json(data)
    })
}

exports.add_user = (req, res) => {
  const {teamId, userId, approvalStatus} = req.body

  if (approvalStatus === "pending") {
    Team.findByIdAndUpdate(teamId, { $addToSet: {pending_users: userId}})
      .exec((err, data) => {
        console.log(data)
      })

    User.findByIdAndUpdate(userId, { $addToSet: {pending_teams: teamId}}, {'new': true})
      .exec((err, data) => {
        console.log(data)
        res.json(data)
      })
  } else {
    Team.findByIdAndUpdate(teamId, { $addToSet: {users: userId}, $pull: {pending_users: userId}})
      .exec((err, data) => {
        console.log(data)
      })

    User.findByIdAndUpdate(userId, { $addToSet: {teams: teamId}, $pull: {pending_teams: teamId}})
      .exec((err, data) => {
        console.log(data)
        res.json(data)
      })
  }
}

exports.approve_user_request = (req, res) => {
  const {teamId, userId} = req.body

  Team.findByIdAndUpdate(teamId, { $addToSet: {users: userId}, $pull: {pending_users: userId}})
    .exec((err, data) => {
      console.log(data)

    })

  User.findByIdAndUpdate(userId, { $addToSet: {teams: teamId}, $pull: {pending_teams: teamId} })
    .exec((err, data) => {
      console.log(data)
      res.json(data)
    })

}

exports.deny_user_request = (req, res) => {
  const {teamId, userId} = req.body

  Team.findByIdAndUpdate(teamId, { $pull: {pending_users: userId}})
    .exec((err, data) => {
      console.log(data)

    })

  User.findByIdAndUpdate(userId, { $pull: {pending_teams: teamId} })
    .exec((err, data) => {
      console.log(data)
      res.json(data)
    })

}

exports.remove_user = (req, res) => {
  const {teamId, userId} = req.body
  Team.findByIdAndUpdate(teamId, { $pull: {users: userId}})
    .exec((err, data) => {
      console.log(data)
    })

  User.findByIdAndUpdate(userId, { $pull: {teams: teamId}})
    .exec((err, data) => {
      console.log(data)
      res.json(data)
    })
}
