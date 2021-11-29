const { Schema, model } = require('mongoose')

const billSchema = new Schema({
  billType: String,
  amount: Number,
  dateDue: Date,
  paid: Boolean,
})

module.exports = model('Bill', billSchema)
