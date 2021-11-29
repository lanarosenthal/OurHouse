import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import ShoppingList from './ShoppingList'
import BillsList from './BillsList'

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
    </>
  )
}

export default App
