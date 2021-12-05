const { Schema, model } = require('mongoose')

const shoppingItemSchema = new Schema({
  item: String,
  quantity: Number,
  house: String,
})

module.exports = model('ShoppingItem', shoppingItemSchema)
