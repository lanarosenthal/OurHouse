const express = require('express')
const User = require('../models/user')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

// signup
router.post('/signup', async (req, res) => {
  const { username, password, house } = req.body
  console.log(username)
  console.log(password)
  console.log(house)

  try {
    await User.create({ username, password, house })
    res.send('user created')
  } catch (err) {
    res.send('user creation has problems')
  }
})

// login
router.post('/login', async (req, res) => {
  const { username, password, house } = req.body

  try {
    const user = await User.findOne({ username, house })

    if (!user) {
      res.send('user does not exist')
    } else {
      const { password: passDB } = user // const passDB = user.password
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        req.session.house = house
        req.session.save()
        // console.log(req.session);
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    res.send('user login has problems')
  }
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  req.session.password = ''
  req.session.house = ''
  res.send('user is logged out')
})

module.exports = router
