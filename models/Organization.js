const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  username: String,
  first_name: String,
  last_name: String,
  organization: String,
  permission_level: {type: String, required: true, enum: ['Admin', 'Editor'], default: 'Editor'},
  // resourceCollections: [ResourceCollectionSchema]
  // image:
});

OrganizationSchema
  .virtual('full_name')
  .get(function () {
    return this.first_name + ' ' + this.last_name;
  });

// OrganizationSchema
//   .virtual('url')
//   .get(function () {
//     return '/catalog/author/' + this._id;
//   });

module.exports = mongoose.model('Organization', OrganizationSchema);
