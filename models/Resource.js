const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  title: {type:String, required:true, max: 100},
  path: String,
  // image:
  short_description: String,
  language: String,
  format: String,
  source_organization: String,
  source_url: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resource', ResourceSchema);
