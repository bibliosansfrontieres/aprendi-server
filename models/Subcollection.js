const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcollectionSchema = new Schema({
  title: {type:String, required:true, max: 100},
  slug: String,
  // image:
  short_description: String,
  long_description: String,
  language: String,
  // subcollections: [[{ type: Schema.Types.ObjectId, ref: 'SubcollectionSchema' }]],
  resources: [[{ type: Schema.Types.ObjectId, ref: 'ResourceSchema' }]],
  default_zoom: Number,
  // editing_users: [[{ type: Schema.Types.ObjectId, ref: 'User' }]],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Subcollection', SubcollectionSchema);
