/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import ShoppingList from './ShoppingList'
import BillsList from './BillsList'
import Calendar from './Calendar'
import addCalendarEvent from './GoogleCalendar'

const App = function () {
  const [sessionUsername, setSessionUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <p>HIIIII</p>
      <Login setSessionUsername={setSessionUsername} setLoggedIn={setLoggedIn} />
      <Signup />
      <ShoppingList loggedIn={loggedIn} />
      <BillsList loggedIn={loggedIn} />
      <Calendar roommateName={sessionUsername} loggedIn={loggedIn} />
      <button type="submit" onClick={addCalendarEvent('11:00', 'here', 'Lana')}>Add Event</button>

    </>
  )
}

export default App
