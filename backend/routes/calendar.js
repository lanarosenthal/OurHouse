const express = require('express')
const Calendar = require('../models/calendar_entry')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

// calendar
router.get('/', async (req, res) => {
  try {
    const cal = await Calendar.find({})
    res.json(cal)
  } catch (err) {
    res.send('error in finding calendar entries')
  }
})

// calendar/add
router.post('/add', isAuthenticated, async (req, res) => {
  const { eventDate, roommateName, event } = req.body

  try {
    await Calendar.create({ eventDate, roommateName, event })
    res.send('event added')
  } catch (err) {
    res.send('adding calendar item has problems')
  }
})

// delete cal entry
router.post('/delete', isAuthenticated, async (req, res) => {
  const { eventDate, roommateName, event } = req.body

  try {
    await Calendar.deleteOne({ eventDate, roommateName, event })
    res.send('calendar entry is deleted')
  } catch (err) {
    console.log(err)
    res.send('calendar entry deletion has problems')
  }
})

module.exports = router
