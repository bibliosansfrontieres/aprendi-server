const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  team_name: String,
  path: String,
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  resources: [[{ type: Schema.Types.ObjectId, ref: 'ResourceSchema' }]]
  // users:
  // resources: ? - probably not because there could also just be the big resources colelction which could be queried by organization
});

module.exports = mongoose.model('Team', TeamSchema);
