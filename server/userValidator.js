const Joi = require('joi')

module.exports = {
  bodyValidator: (schema) => {
    return (req, res, next) => {
      const dataCheck = Joi.validate(req.body, schema)
      if(dataCheck.error) {
        return res.status(400).json(dataCheck.error)
      }
      if(!req.userData) req.userData = {}
      req.userData['body'] = dataCheck.value
      next()
    }
  },
  userInputSchema: {
    authorize: Joi.object().keys({
      username: Joi.string().alphanum().min(6).max(20).required(),
      password: Joi.string().min(6).max(30).required(),
      carSelections: Joi.array().items(Joi.string())
    }),
    authDelete: Joi.object().keys({
      username: Joi.string(),
      password: Joi.string().required()
    })
  }
}
