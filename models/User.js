const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({
  auth0id: {type:String, required:true, unique:true},
  email: String,
  name: String,
  image_url: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  permission_level: {type: String, required: true, enum: ['Admin', 'Editor'], default: 'Editor'},
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
