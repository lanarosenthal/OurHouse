const express = require('express')
const ShoppingItem = require('../models/shopping_item')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

// shopping list
router.get('/', async (req, res) => {
  try {
    const it = await ShoppingItem.find({})
    res.json(it)
  } catch (err) {
    res.send('error in finding items')
  }
})

// items/add
router.post('/add', isAuthenticated, async (req, res) => {
  const { item, quantity } = req.body

  try {
    const it = await ShoppingItem.create({ item, quantity })
    res.send(it)
  } catch (err) {
    res.send('adding item has problems')
  }
})

// update item
router.post('/update', isAuthenticated, async (req, res) => {
  const { item, quantity } = req.body

  try {
    await ShoppingItem.updateOne({ item }, { quantity })
    res.send('item quantity updated')
  } catch (err) {
    console.log(err)
    res.send('item update occurs problems')
  }
})

// delete item
router.post('/delete', isAuthenticated, async (req, res) => {
  const { item, quantity } = req.body

  try {
    await ShoppingItem.deleteOne({ item, quantity })
    res.send('item is deleted')
  } catch (err) {
    console.log(err)
    res.send('item deletion has problems')
  }
})

module.exports = router
