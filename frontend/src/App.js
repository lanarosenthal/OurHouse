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
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setSessionHouse={setSessionHouse} setSessionUsername={setSessionUsername} setLoggedIn={setLoggedIn} />} />
        <Route path="/shoppinglist" element={<ShoppingList loggedIn={loggedIn} house={sessionHouse} setSessionUsername={setSessionUsername} setLoggedIn={setLoggedIn} />} />
        <Route path="/billslist" element={<BillsList loggedIn={loggedIn} setSessionUsername={setSessionUsername} setLoggedIn={setLoggedIn} />} />
        <Route path="/calendarlist" element={<GoogleCalendar />} />
      </Routes>
    </Router>
  )
}

export default App
