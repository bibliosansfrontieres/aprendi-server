const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  title: {type:String, required:true, max: 100},
  slug: String,
  // image:
  short_description: String,
  long_description: String,
  language: String,
  disclaimer_message: String,
  // subcollections: [[{ type: Schema.Types.ObjectId, ref: 'CollectionSchema' }]],
  resources: [[{ type: Schema.Types.ObjectId, ref: 'ResourceSchema' }]],
  organization: String,
  default_zoom: Number,
  // editing_users: [[{ type: Schema.Types.ObjectId, ref: 'User' }]],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Collection', CollectionSchema);
