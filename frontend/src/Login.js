import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './App.css'

import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = function ({ setSessionUsername, setLoggedIn, setSessionHouse }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [house, setHouse] = useState('')
  const [link, setLink] = useState('/login')

  const loginUser = async () => {
    console.log(username)
    console.log(password)
    console.log(house)

    const { data } = await axios.post('/account/login', { username, password, house })
    if (data === 'user logged in successfully') {
      setSessionUsername(username)
      setSessionHouse(house)
      setLoggedIn(true)
      setLink('/shoppinglist')
    } else {
      window.alert(data)
    }
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: `50px` }}>OurHouse</h1>
      <Card className="signuplogin border border-primary rounded">
        <Form className="forminside">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>House</Form.Label>
            <Form.Control placeholder="House Code" onChange={e => setHouse(e.target.value)} />
          </Form.Group>
          <Link to={link}>
            <Button variant="primary" type="submit" onClick={loginUser}>
              Login
            </Button>
          </Link>
          <br />
          <Form.Text className="text-muted">
            Not yet registered?
            <Link to="/signup"> Sign up</Link>
          </Form.Text>
        </Form>
      </Card>
    </>
  )
}

export default Login
