const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthToken = new Schema({
  access_token: String,
  expires_in: Number,
  scope: String,
  token_type: String,
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('AuthToken', AuthToken)
