const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicleModel')


// Get all car models from db
router.get('/cars/:car', (req, res, next) => {
  Vehicle.find({ carClass: `${req.params.car}` })
    .then(models => {
      if(!models.length) {
          res.send(404).json('Not Found')
      }
      else {
        res.status(200).json(models)
      }
    })
    .catch(err => {
      res.status(500).json({err})
    }
  )
})

// Get car class names for car-finder
router.get('/car-finder', (req, res, next) => {
  Vehicle.distinct('carClass')
    .then(models => {
      res.status(200).json( models )
    })
    .catch(err => {
      res.status(500).json({error: err})
    }
  )
})

module.exports = router
