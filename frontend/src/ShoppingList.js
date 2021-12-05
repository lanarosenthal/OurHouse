import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

const ShoppingList = function ({ loggedIn, house }) {
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

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        <h1>Items:</h1>

        {loggedIn
          ? (
            <>
              <Button variant="primary" onClick={handleShow}>
                Add an item
              </Button>
              <br />
              <Modal show={show} onHide={handleClose}>
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
              </Modal>

              {shopList.map(listItem => (
                <div className="card-deck">
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
                </div>
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
      </div>
    </Router>
  )
}

export default ShoppingList
