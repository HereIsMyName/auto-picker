const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const { _SECRET }  = require('./sessionConfig/secrets')
const User = require('./models/userModel')

// Strategy for web tokens
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: _SECRET
}, async (jwt_payload, done) => {
    try{
      const user = await User.findById(jwt_payload.sub)
        if(!user) 
          return done(null, false)

        else 
          return done(null, user)
    } catch(err) {
        done(err, false)
    }
   
  }
))

// Local strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username })
        
      if(!user) 
        return done(null, false)
      
      const match = await user.checkPassword(password)
      
      if(!match)
        return done(null, false)

      done(null, user)
    } catch(err) {
        done(err, false)
    }
    
}))