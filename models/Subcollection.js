const mongoose = require('mongoose')
const Schema = mongoose.Schema

let SubcollectionSchema = new Schema({
  title: {type:String, required:true, max: 100},
  path: {type:String, required:true},
  image_url : String,
  disclaimer_message: String,
  subcollections: [{ type: Schema.Types.ObjectId, ref: 'Subcollection' }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
},
{
  timestamps: true
})

let autoPopulate = function(next) {
  this.populate('subcollections')
  this.populate('resources')
  next()
}

SubcollectionSchema.
  pre('findOne', autoPopulate).
  pre('find', autoPopulate)

module.exports = mongoose.model('Subcollection', SubcollectionSchema)
