const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const config = require('./config/env')
const path = require('path')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connect to db
mongoose.connect(config.db, {useNewUrlParser: true})
.then(() => console.log(`MongoDB Connected to: ${config.db}`))
.catch(err => console.log(`Problem connecting to database: ${config.db} `, err))

mongoose.Promise = global.Promise

app.use(passport.initialize());

// Routes
app.use(require('./routes/car_api'))
app.use(require('./routes/user_api'))

// Production setup 
if(config.env === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


// Error handling
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
})


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Listening on port ${port} (${config.env} mode)`);
});
