/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import ShoppingList from './ShoppingList'
import BillsList from './BillsList'
import GoogleCalendar from './GoogleCalendar'

const App = function () {
  const [sessionUsername, setSessionUsername] = useState('')
  const [sessionHouse, setSessionHouse] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={ <Signup />} />
          <Route path="/login" element={<Login setSessionHouse={setSessionHouse} setSessionUsername={setSessionUsername} setLoggedIn={setLoggedIn} />} />
          <Route path="/shoppinglist" element={<ShoppingList loggedIn={loggedIn} house={sessionHouse} />} />
          <Route path="/billslist" element={<BillsList loggedIn={loggedIn} />} />
          <Route path="/calendarlist" element={<GoogleCalendar />} />

        </Routes>
      </Router>

      {/* <p>HIIIII</p>
      <Login setSessionUsername={setSessionUsername} setLoggedIn={setLoggedIn} />
      <Signup />
      <ShoppingList loggedIn={loggedIn} />
      <BillsList loggedIn={loggedIn} />
      <Calendar roommateName={sessionUsername} loggedIn={loggedIn} />
      <button type="submit" onClick={addCalendarEvent('11:00', 'here', 'Lana')}>Add Event</button> */}

    </>
  )
}

export default App
