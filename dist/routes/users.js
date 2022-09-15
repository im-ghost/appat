"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { ensureAuth, ensureGuest } = require('../Middlewares/auth');
// Login Page
router.get('/login', ensureGuest, (req, res) => res.render('login', {
    title: "login",
    email: "",
    password: ""
}));
// Register Page
router.get('/register', ensureGuest, (req, res) => res.render('register', {
    title: "Register",
    email: "",
    password: "",
    password2: "",
    displayName: "",
    firstName: "",
    lastName: ""
}));
// Register
router.post('/register', (req, res) => {
    const { firstName, lastName, displayName, email, password, password2 } = req.body;
    let errors = [];
    if (!firstName || !email || !password || !password2 || !lastName || !displayName) {
        errors.push({
            msg: 'Please enter all fields'
        });
    }
    if (password != password2) {
        errors.push({
            msg: 'Passwords do not match'
        });
    }
    if (password.length < 6) {
        errors.push({
            msg: 'Password must be at least 6 characters'
        });
    }
    if (errors.length > 0) {
        console.log(errors);
        res.render('register', {
            title: "Register",
            errors: errors,
            firstName,
            lastName,
            displayName,
            email,
            password,
            password2,
        });
    }
    else {
        User.findOne({
            email: email
        }).then(user => {
            if (user) {
                errors.push({
                    msg: 'Email already exists'
                });
                console.log("errors");
                res.redirect("/");
            }
            else {
                const newUser = new User({
                    firstName,
                    lastName,
                    displayName,
                    email,
                    password
                });
                if (newUser) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err)
                                throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                /* req?.flash(
                            'success_msg',
                            'You are now registered and can log in'
                          );*/
                                console.log(newUser);
                                res.redirect('/');
                            })
                                .catch(err => console.log(err));
                        });
                    });
                }
                else {
                    console.log(newUser);
                }
            }
        });
    }
});
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});
module.exports = router;
