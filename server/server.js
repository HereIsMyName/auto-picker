const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/env')

const app = express()

// Connect to db
mongoose.connect(config.db, {useNewUrlParser: true})
mongoose.Promise = global.Promise;

mongoose.connection.on('error', () => {
  throw new Error(`There was a problem connecting to database: ${config.db}`);
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${config.db}`);
});

app.use(express.static('public'))
app.use(express.static('images'))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use(require('./routes/car_api'))
app.use(require('./routes/user_api'))

// Error handling
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
})

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port} (${config.env})`);
});
