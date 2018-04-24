const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const { urlValidate } = require('../utils/url_validate')
const Collection = require('./Collection')
const Resource = require('./Resource')


const TeamSchema = new Schema({
  team_name: {type:String, required:[true, 'Team name is required'], maxlength: [100, 'Name too long - max character count is 100'], unique: true},
  path: {type:String, required: true, unique: true},
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  image_url: String,
  thumbnail_image_url: String,
  description: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pending_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
  timestamps: true
})

TeamSchema.plugin(uniqueValidator)

TeamSchema.pre('remove', function(next) {
  Collection.deleteMany({_id: {$in: this.collections}}, function(err, data){})
  Resource.deleteMany({_id: {$in: this.resources}}, function(err, data){})
  next()
});

module.exports = mongoose.model('Team', TeamSchema)
