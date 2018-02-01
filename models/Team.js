const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  team_name: String,
  team_id: String,
  // users:
});

module.exports = mongoose.model('Team', TeamSchema);
