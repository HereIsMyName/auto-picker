const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema


const vehicleSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  carClass: String,
  model: String
})


module.exports = mongoose.model('vehicle', vehicleSchema)
