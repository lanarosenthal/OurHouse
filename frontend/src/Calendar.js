import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

const Calendar = function ({ loggedIn, roommateName }) {
  const [calList, setCalList] = useState([])
  const [eventDate, setEventDate] = useState(Date.now())
  const [event, setEvent] = useState('')
  const [show, setShow] = useState(false)
  const [mark, setMarked] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addEvent = async () => {
    const { data } = await axios.post('/calendar/add', { eventDate, roommateName, event })
    if (data === 'event added') {
      setShow(false)
    } else {
      setShow(false)
      window.alert(data)
    }
  }

  const retrieveEvents = async () => {
    const { data } = await axios.get('/calendar/')
    setCalList(data)
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      retrieveEvents()
    }, 2000)
    return () => {
      setCalList([]); clearInterval(intervalID)
    }
  }, [])

  const deleteEvent = async () => {
    const { data } = await axios.post('/calendar/delete', { eventDate, roommateName, event })
    if (data === 'calendar entry is deleted') {
      console.log('deleted')
    } else {
      window.alert(data)
    }
  }

  return (
    <>
      <h1>Events:</h1>
      <Link to="/billslist">
        Bills
      </Link>
      <Link to="/shoppinglist">
        Shopping List
      </Link>
      <br />
      {loggedIn
        ? (
          <>
            <Button variant="primary" onClick={handleShow}>
              Add an event
            </Button>
            <br />
            <Modal show={show} onHide={handleClose}>
              Event Description:
              <input onChange={e => setEvent(e.target.value)} />
              Event Date:
              <input onChange={e => setEventDate(new Date(e.target.value))} />
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={addEvent}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            { calList.map(ev => (
              <>
                {ev.event}
                <br />
                {ev.eventDate}
                <br />
                {ev.roommateName}
                <br />
                {(roommateName === ev.roommateName)
                  ? (
                    <>
                      <button
                        type="submit"
                        onClick={e => {
                          setEvent(ev.event)
                          setEventDate(ev.eventDate)
                          setMarked(true)
                        }}
                      >
                        Mark For Deletion
                      </button>
                      {mark
                        ? (
                          <button
                            type="submit"
                            onClick={deleteEvent}
                          >
                            Delete
                          </button>
                        ) : (<br />)}
                    </>
                  ) : (<br />)}
              </>
            ))}
          </>
        ) : (
          <Link to="/login">
            <>
              <Button variant="primary">
                Log in to add an event
              </Button>
              <br />
            </>
          </Link>
        )}
    </>
  )
}

export default Calendar
