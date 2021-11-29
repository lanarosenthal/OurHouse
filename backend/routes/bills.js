const express = require('express')
const Bill = require('../models/bill')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

// bill list
router.get('/', async (req, res) => {
  try {
    const bill = await Bill.find({})
    res.json(bill)
  } catch (err) {
    res.send('error in finding bills')
  }
})

// bills/add
router.post('/add', isAuthenticated, async (req, res) => {
  const { billType, amount, dateDue } = req.body

  try {
    await Bill.create({
      billType, amount, dateDue, paid: false,
    })
    res.send('bill added')
  } catch (err) {
    res.send('adding bill has problems')
  }
})

// toggle paid
router.post('/update', isAuthenticated, async (req, res) => {
  const { _id } = req.body

  try {
    await Bill.updateOne({ _id }, { paid: true })
    res.send('bill has been paid')
  } catch (err) {
    console.log(err)
    res.send('change bill to paid has problems')
  }
})

module.exports = router
