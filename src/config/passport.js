const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  const user = await User.findOne({ email: email })
  if (!user) {
    return done(null, false, { message: 'Not User Found' })
  } else {
    const match = await user.matchPassword(password)
    if (match) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Incorrect Password' })
    }
  }
}))

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
    })
  })
})

passport.deserializeUser(function (user, cd) {
  process.nextTick(function () {
    return cd(null, user)
  })
})