import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

const BillsList = function ({ loggedIn }) {
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

  return (
    <>
      <h1>Bills:</h1>
      <Link to="/shoppinglist">
        Shopping List
      </Link>
      <Link to="/calendarlist">
        Calendar
      </Link>
      <br />
      {loggedIn
        ? (
          <>
            <Button variant="primary" onClick={handleShow}>
              Add a bill
            </Button>
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
              <>
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
                    <button
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
                    </button>
                  ) : (<br />)}
              </>
            ))}
          </>
        ) : (
          <Link to="/login">
            <>
              <Button variant="primary">
                Log in to add a bill
              </Button>
              <br />
            </>
          </Link>
        )}

    </>
  )
}

export default BillsList
