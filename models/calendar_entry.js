const { Schema, model } = require('mongoose');

const calendarSchema = new Schema({
  eventDate: Date,
  roommateName: String,
  event: String,
});

module.exports = model('Calendar', calendarSchema);
