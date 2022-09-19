"use strict";
// Load User model
module.exports = function (passport) {
    const GoogleStrategy = require('passport-google-oauth2').Strategy;
    const User = require('../models/User');
    const LocalStrategy = require('passport-local').Strategy;
    const bcrypt = require('bcryptjs');
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            email: profile.email,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
        };
        try {
            let user = await User.findOne({
                googleId: profile.id
            });
            if (user) {
                done(null, user);
            }
            else {
                user = await User.create(newUser);
                done(null, user);
            }
        }
        catch (err) {
            console.error(err);
        }
    })),
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};