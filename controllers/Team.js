var Team = require('../models/Team');
const { getTeamUsers } = require('../utils/get_team_users')

exports.create = function(req, res) {
  console.log(req.body)
  const {data} = req.body

  Team.create(data, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};

exports.delete_by_id = function(req, res) {
  Team.findByIdAndRemove(req.query, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};

exports.update_by_id = function(req, res) {
  const {data} = req.body
  Team.findByIdAndUpdate(data._id, {$set: data}, (err, data) => {
    res.json(data)
  })
};

exports.find_by_url = function(req, res) {
  console.log("finding", req.query)

  Team.findOne(req.query)
    .populate('collections')
    .exec((err, results) => {
      if (err) { res.send(err) }
      console.log(results)
      res.json(results)
      // let retObject = {};
      // retObject.team_id = results.team_id;
      // retObject.team_name = results.team_name;
      //
      // let getUsersPromise = getTeamUsers(results.team_id)
      // let getCollectionsPromise = getCollectionsByTeam(results.team_id)
      //
      // Promise.all([getUsersPromise, getCollectionsPromise]).then(([users, collections]) => {
      //   retObject.users = JSON.parse(users)
      //   retObject.collections = collections
      //   res.json(retObject)
      // });
    })
};

exports.get_full_list = function(req, res) {
  Team.find({}, (err, data) => {
    if (err) { res.send(err) }
    res.json(data)
  })
};
