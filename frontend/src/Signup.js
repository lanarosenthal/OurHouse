import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Signup = function () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [house, setHouse] = useState('')

  const createUser = async () => {
    console.log(username)
    console.log(password)
    const { data } = await axios.post('/account/signup', { username, password, house })
    if (data !== 'user created') {
      window.alert('user creation failed. Please return to signup to try again')
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
          <Form.Text className="text-muted">
            Share this house code with your roommates so you can all use OurHouse!
          </Form.Text>
          <br />
          <Link to="/login">
            <Button variant="primary" type="submit" onClick={createUser}>
              Signup
            </Button>
          </Link>
          <br />
          <Form.Text className="text-muted">
            Already have an account?
            <Link to="/login"> Login</Link>
          </Form.Text>
        </Form>
      </Card>
    </>
  )
}

export default Signup
