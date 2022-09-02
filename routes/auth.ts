const router = require("express").Router()
import {
  Request,
  Response
} from "express"
const passport = require('passport');
// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req: Request, res: Response) => {
    res.redirect('/')
  }
)

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/twitter', passport.authenticate('twitter', {
  scope: ['profile']
}))

// @desc    Google auth callback
// @route   GET /auth/twittere/callback
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login'
  }),
  (req: Request, res: Response) => {
    res.redirect('/')
  }
)
/*
// @desc    Auth with Google
// @route   GET /auth/google
router.get('/email', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/index')
  }
)*/
// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req: any, res: Response, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)}
    res.redirect('/')
  })
})

module.exports = router