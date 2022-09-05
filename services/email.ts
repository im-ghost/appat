module.exports = function(passport: any) {
  const GoogleStrategy = require('passport-google-oauth2').Strategy
  const User = require('../models/User')
  const LocalStrategy = require('passport-local').Strategy;
  const bcrypt = require('bcryptjs');
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email: any, password: any, done: any) => {
      // Match user
      User.findOne({
        email: email
      }).then((user:any)=>{
      if (!user) {
        return done(null, false, {
          message: 'That email is not registered'
        });
      }
      console.log(user)

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Password incorrect'
          });
        }
      });
      })
    }))

  passport.serializeUser(function(user: any, done: any) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id: any, done: any) {
    User.findById(id, function(err: any,
      user: any) {
      done(err,
        user);
    });
  });
};