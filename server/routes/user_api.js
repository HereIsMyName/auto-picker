const express = require('express')
const router = express.Router()
const { bodyValidator, userInputSchema } = require('../userValidator')
const jwt = require('jsonwebtoken')
const { _SECRET } = require('./../sessionConfig/secrets')
const User = require('../models/userModel')
const passport = require('passport')
const passportConfig = require('../passport')

signAToken = user => {
  return jwt.sign({
    iss: 'Carpicker',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 2 )
  }, _SECRET)
}

router.post('/signup', 
  bodyValidator(userInputSchema.authorize),
  (req, res, next) => {
    const { username, password } = req.body

    // Assure that username is not already taken
    User.findOne({ username })
    .then(doesUserExist => {

      if(doesUserExist)
        res.status(403).json({ error: "Username already taken" })

      else {
        // Create a new user
        const newUser = new User({username, password})
        
        // carSelections will hold users' car choices
        newUser.carSelections = []
        newUser.save((err, user) => {
            if(err) 
              res.send(err)

            // Webtoken generated here
            const webToken = signAToken(newUser)
            
            res.status(200).json({ webToken })
        })
      }
    })
    .catch(err => {
      res.status(500).json('There was an error')
    })
  }
)

router.post('/signin', 
  bodyValidator(userInputSchema.authorize), passport.authenticate('local', { session: false }), 
  (req, res) => {
    try {
      const webToken = signAToken(req.user)
      res.status(200).json({ webToken })
    } 
    catch (err) {
      res.status(403).json('error')
    }
  }
)

// Deletes user's account
router.delete('/deleteAccount', 
  bodyValidator(userInputSchema.authDelete), passport.authenticate('local', { session: false }), 
  (req, res) => {
    try {
      User.findByIdAndDelete({ _id : req.user._id })
      .then(data => res.status(200).json('Your account has been successfully deleted'))
   } 
   catch (err) {
      res.status(403).json('error')
   }
  }
)

// Gets protected resources from db
router.get('/secret',
  passport.authenticate('jwt', { session: false }),
    (req, res, next) => {

      // Find user by name and return stored account info
      User.findOne({ username: req.user.username })
      .then(selections => {
        const cars = selections.carSelections
        const name = selections.username
        const carSelections = {cars, name}

        res.status(200).json( carSelections )
      })
      .catch(err => {
        res.status(500).json('There was an error')
      })
    }
)

// Add cars from redux store to users account
router.put('/addcar', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { carSelections: req.body } }
    )
    .then(success => {
      res.status(200).json(success)
    })
    .catch(err => {
      res.status(403).json('error')
    })
  }
)

// Remove individual cars from users account
router.delete('/removeCar',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    User.updateOne(
      { _id: req.user._id },
      { $pull: { carSelections: req.body } }
    )
    .then(success => {
      res.status(200).json(success)
    })
    .catch(err => {
      res.status(403).json('error')
    })
  }
)

// Remove all cars from users account
router.delete('/deleteAllCars',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    User.update(
      { _id: req.user._id },
      { $pullAll: { carSelections: [...req.user.carSelections] } }
    )
    .then(success => {
      res.status(200).json(success)
    })
    .catch(err => {
      res.status(403).json('error')
    })
  }
)


module.exports = router