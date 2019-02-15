const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema


const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  carSelections: {
    type: Array,
    default: "Your selections go here"
  }
})


User.pre('save', async function(next)  {
  try {
    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(this.password, salt)
    this.password = hash
    next()
  } catch(err) {
      next(err)
  }
})

User.methods.checkPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password)
  } 
  catch(err) {
    throw new Error(err)
  }
}

module.exports = mongoose.model('user', User)