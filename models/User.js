const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({
  auth0id: {type:String, required:true, unique:true},
  email: String,
  name: String,
  image_url: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  pending_teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  core_admin: { type:Boolean, default: false },
},
{
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
