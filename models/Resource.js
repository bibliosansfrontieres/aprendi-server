const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  title: {type:String, required:true, max: 100},
  path: String,
  image_url : String,
  short_description: String,
  language: String,
  resource_type: String,
  source_organization: String,
  source_url: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resource_url: String,
  video_provider: String,
  rich_text: String,
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

module.exports = mongoose.model('Resource', ResourceSchema);
