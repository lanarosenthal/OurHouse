import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'

import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

const BillsList = function ({ setLoggedIn, setSessionUsername, loggedIn }) {
  const [billList, setBillList] = useState([])
  const [id, setID] = useState('')
  const [billType, setBillType] = useState('')
  const [amount, setAmount] = useState(0)
  const [dateDue, setDateDue] = useState(Date.now())
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const retrieveBills = async () => {
    const { data } = await axios.get('/bills/')
    setBillList(data)
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      retrieveBills()
    }, 2000)
    return () => {
      setBillList([]); clearInterval(intervalID)
    }
  }, [])

  const togglePaid = async ({ _id }) => {
    console.log('id ', _id)
    const { data } = await axios.post('/bills/update', { _id })
    if (data !== 'bill has been paid') {
      window.alert(data)
    }
  }

  const addBill = async () => {
    const { data } = await axios.post('/bills/add', { billType, amount, dateDue })
    if (data === 'bill added') {
      setShow(false)
    } else {
      setShow(false)
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/shoppinglist" style={{ color: 'inherit', textDecoration: 'inherit', marginTop: '9px'}}>Shopping List</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/billslist" style={{ color: 'inherit', textDecoration: 'inherit', marginTop: '9px'}}>Bills</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/calendarlist" style={{ color: 'inherit', textDecoration: 'inherit', marginTop: '9px'}}>Calendar</Link>
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
      <h1 style={{ textAlign: 'center' }}>Bills:</h1>
      {loggedIn
        ? (
          <>
            <div className="additem">
              <Button variant="primary" onClick={handleShow}>
                Add a bill
              </Button>
            </div>
            <br />
            <Modal show={show} onHide={handleClose}>
              Bill Description:
              <input onChange={e => setBillType(e.target.value)} />
              Amount:
              <input onChange={e => setAmount(e.target.value)} />
              Date Due:
              <input onChange={e => setDateDue(new Date(e.target.value))} />
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={addBill}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            {billList.map(bill => (
              <Card className="cards">
                {bill.billType}
                <br />
                {bill.amount}
                <br />
                {bill.dateDue}
                <br />
                Bill paid:&nbsp;
                {bill.paid ? ('true') : ('false')}
                <br />
                {!bill.paid
                  ? (
                    <Button
                      type="submit"
                      onClick={e => {
                        setID(bill._id)
                        setID(_id => {
                          console.log(_id)
                          togglePaid({ _id })
                        })
                      }}
                    >
                      Mark as Paid
                    </Button>
                  ) : (<br />)}
              </Card>
            ))}
          </>
        ) : (
          <Link to="/login">
            <>
              <div className="additem">
                <Button variant="primary">
                  Log in to add a bill
                </Button>
              </div>
              <br />
            </>
          </Link>
        )}

    </>
  )
}

export default BillsList
