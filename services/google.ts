// Load User model

module.exports = function (passport: any) {
  const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        const newUser = {
          googleId: profile.id,
          email: profile.email,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          friends :[],
          memories:[],
          rooms:[],
          notifications:[],
          isActive:false,
        }

        try {
          let user: any = await User.findOne({
            googleId: profile.id
          })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  ),

  passport.serializeUser((user: any,
    done: any) => {
    done(null,
      user.id)
  })

  passport.deserializeUser((id: any,
    done: any) => {
    User.findById(id,
      (err: any, user: any) => done(err, user))
  })
}