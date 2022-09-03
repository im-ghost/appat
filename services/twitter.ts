const TwitterStrategy = require('passport-twitter')
// Load User model

module.exports = function (passport: any) {
  const User = require('../models/User')
  const LocalStrategy = require('passport-local').Strategy;
  const bcrypt = require('bcryptjs');
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_ID,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: '/auth/twitter/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        const newUser: any = {
          googleId: profile.id,
          email: profile.email,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
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