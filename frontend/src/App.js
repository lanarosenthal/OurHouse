import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const App = function () {
  const [sessionUsername, setSessionUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <p>HIIIII</p>
      <p>yoo</p>
      <Login setSessionUsername={setSessionUsername} setLoggedIn={setLoggedIn} />
      <Signup />
    </>
  )
}

export default App
