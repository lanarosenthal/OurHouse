const { Schema, model } = require('mongoose');

const shoppingItemSchema = new Schema({
  item: String,
  quantity: Number,
});

module.exports = model('ShoppingItem', shoppingItemSchema);
