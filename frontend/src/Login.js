import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = function ({ setSessionUsername, setLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    if (data === 'user logged in successfully') {
      setSessionUsername(username)
      setLoggedIn(true)
    } else {
      window.alert(data)
    }
  }

  return (
    <>
      <p>Username:</p>
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      <p>Password:</p>
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <br />
      {/* <Link to="/"> */}
      <button type="submit" onClick={loginUser}> Login </button>
      {/* </Link> */}
      <p>
        Not yet registered?
        {/* <Link to="/signup"> Sign up</Link> */}
      </p>
    </>
  )
}

export default Login
