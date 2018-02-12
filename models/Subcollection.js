const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubcollectionSchema = new Schema({
  title: {type:String, required:true, max: 100},
  path: String,
  image_url : String,
  short_description: String,
  long_description: String,
  subcollections: [{ type: Schema.Types.ObjectId, ref: 'Subcollection' }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  default_zoom: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

let autoPopulate = function(next) {
  this.populate('subcollections');
  this.populate('resources');
  next();
};

SubcollectionSchema.
  pre('findOne', autoPopulate).
  pre('find', autoPopulate);

module.exports = mongoose.model('Subcollection', SubcollectionSchema);
