const mongoose = require('mongoose')
const express = require('express')
const session = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
const BillsRouter = require('./routes/bills')
const CalendarRouter = require('./routes/calendar')
const ItemsRouter = require('./routes/shopping')
// const isAuthenticated = require('./middlewares/isAuthenticated');

const app = express()
const port = process.env.PORT || 3000

const MONGO_URI = 'mongodb+srv://dbUser:iqZLaBMG8dy8Wi@cluster0.9wlwh.mongodb.net/OurHouse?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 86400000, // in ms
}))

app.use(express.static('dist'))

app.use(express.json())

app.use('/account', AccountRouter)
app.use('/bills', BillsRouter)
app.use('/calendar', CalendarRouter)
app.use('/shopping', ItemsRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
