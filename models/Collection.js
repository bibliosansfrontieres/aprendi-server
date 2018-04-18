const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const CollectionSchema = new Schema({
  title: {type:String, required:true, max: 100},
  path: {type:String, required:true, max: 50, unique:true},
  image_url : String,
  thumbnail_image_url : String,
  disclaimer_message: String,
  subcollections: [{ type: Schema.Types.ObjectId, ref: 'Subcollection' }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  created_by: {type:String, required:true},
  contact_email: {type:String, required:true},
  created_by_image: String
},
{
  timestamps: true
})

CollectionSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Collection', CollectionSchema)
