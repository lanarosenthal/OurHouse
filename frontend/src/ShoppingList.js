import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Card, CardColumns } from 'react-bootstrap'

import Container from 'react-bootstrap/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

const ShoppingList = function ({
  setLoggedIn, setSessionUsername, loggedIn, house,
}) {
  const [shopList, setShopList] = useState([])
  const [item, setIt] = useState('')
  const [quantity, setQuant] = useState(0)
  const [editModal, setEditModal] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addItem = async () => {
    console.log('sessionHouse', house)
    const { data } = await axios.post('/shopping/add', { item, quantity, house })
    if (data === 'item added') {
      setShow(false)
    } else {
      setShow(false)
      window.alert(data)
    }
  }

  const retrieveItems = async () => {
    console.log(house)
    const { data } = await axios.get('/shopping/')
    setShopList(data)
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      retrieveItems()
    }, 2000)
    return () => {
      setShopList([]); clearInterval(intervalID)
    }
  }, [])

  const deleteItem = async () => {
    console.log(item)
    console.log(quantity)
    const { data } = await axios.post('/shopping/delete', { item, quantity })
    if (data === 'item is deleted') {
      console.log('deleted')
      setEditModal(false)
    } else {
      setEditModal(false)
      window.alert(data)
    }
  }

  const updateItem = async () => {
    console.log(item)
    console.log(quantity)
    const { data } = await axios.post('/shopping/update', { item, quantity })
    if (data === 'item quantity updated') {
      console.log('updated')
      setEditModal(false)
    } else {
      setEditModal(false)
      window.alert(data)
    }
  }

  const logoutUser = async () => {
    const { data } = await axios.get('/account/logout')
    setLoggedIn(false)
    setSessionUsername('')
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>OurHouse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-center">
              <Link to="/shoppinglist">Shopping List</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/billslist">Bills</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/calendarlist">Calendar</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Nav.Link href="/login" onClick={logoutUser}> Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Items:</h1>
      {loggedIn
        ? (
          <>
            <Button variant="primary" onClick={handleShow}>
              Add an item
            </Button>
            <br />
            <Modal show={show} onHide={handleClose}>
              <div>
                Item:
                <input onChange={e => setIt(e.target.value)} />
                Quantity:
                <input onChange={e => setQuant(e.target.value)} />
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={addItem}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </div>
            </Modal>
            {shopList.map(listItem => (
              <Card className="card-deck">
                {listItem.item}
              &nbsp;
                {listItem.quantity}
                <br />
                {loggedIn
                  ? (
                    <>
                      <button
                        type="submit"
                        onClick={e => {
                          setIt(listItem.item)
                          setQuant(listItem.quantity)
                          setEditModal(true)
                        }}
                      >
                        Edit&nbsp;
                        {listItem.item}
                      </button>
                      <br />

                    </>
                  )
                  : (<br />)}
              </Card>
            ))}
            <Modal show={editModal}>
              <button
                type="submit"
                onClick={deleteItem}
              >
                Delete
              </button>
              <input onChange={e => setQuant(e.target.value)} />
              <button
                type="submit"
                onClick={updateItem}
              >
                update
              </button>
            </Modal>
          </>
        ) : (
          <Link to="/login">
            <>
              <Button variant="primary">
                Log in to add and view items
              </Button>
              <br />
            </>
          </Link>
        )}
    </>
  )
}

export default ShoppingList
