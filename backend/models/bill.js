const { Schema, model } = require('mongoose')

const billSchema = new Schema({
  billType: String,
  amount: Number,
  dateDue: Date,
  paid: Boolean,
  house: String,
})

module.exports = model('Bill', billSchema)
