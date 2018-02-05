const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  title: {type:String, required:true, max: 100},
  path: String,
  // image:
  short_description: String,
  long_description: String,
  language: String,
  disclaimer_message: String,
  subcollections: [{ type: Schema.Types.ObjectId, ref: 'Subcollection' }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  default_zoom: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Collection', CollectionSchema);
