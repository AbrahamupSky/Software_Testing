const express = require('express')
const router = express.Router()

const User = require('../models/User')

const passport = require('passport')

router.get('/users/signup', (req, res) => {
  res.render('users/signup')
})

router.get('/users/signin', (req, res) => {
  res.render('users/signin')
})

router.get('/users/evaluation', (req, res) => {
  res.render('users/evaluation')
})

router.get('/users/random', (req, res) => {
  res.render('users/random')
})

router.get('/partials/directions', (req, res) => {
  res.render('partials/directions')
})

router.get('/partials/user', (req, res) => {
  res.render('partials/user')
})

router.get('/partials/schedule', (req, res) => {
  res.render('partials/schedule')
})

router.get('/partials/evaluation-form', (req, res) => {
  res.render('partials/evaluation-form')
})

router.get('/partials/employees', (req, res) => {
  res.render('partials/employees')
})

router.get('/partials/technical-sheet', (req, res) => {
  res.render('partials/technical-sheet')
})

router.post(
  '/users/signin',
  passport.authenticate('local', {
    failureRedirect: '/users/signin',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/notes')
  }
)

router.post('/users/signup', async (req, res) => {
  const { name, email, password, confirm_password } = req.body
  const errors = []

  if (name.length <= 0) {
    errors.push({ text: 'Please insert your name' })
  }

  if (password !== confirm_password) {
    errors.push({ text: 'password do not match' })
  }

  if (password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters' })
  } else if (password.length > 10) {
    errors.push({ text: 'Paassword must not exceed 10 characters' })
  }

  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
      password,
      confirm_password
    })
  } else {
    const emailUser = await User.findOne({ email })
    if (emailUser) {
      req.flash('error_msg', 'This Email is already in use')
      res.redirect('/users/signin')
    }

    const newUser = new User({ name, email, password })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    req.flash('success_msg', 'You are registered!')
    res.redirect('/users/signin')
  }
})

router.get('/users/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }

    res.redirect('/')
  })
})

module.exports = router
