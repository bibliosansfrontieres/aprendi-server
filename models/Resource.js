const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResourceSchema = new Schema({
  title: {type:String, required:true, max: 100},
  path: {type:String, required:true},
  image_url : String,
  disclaimer_message: String,
  resource_type: String,
  more_info: String,
  resource_url: String,
  video_provider: String,
  rich_text_content: String,
  shared: {type: Boolean, default: false},
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
},
{
  timestamps: true
})

module.exports = mongoose.model('Resource', ResourceSchema)
