import React, { Component, setState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const { gapi } = window
const CLIENT_ID = '832645184952-8goibcvijm4b9vb5lkb5sd6pjab9emv8.apps.googleusercontent.com'
const CALENDAR_ID = 'i167p2vs75sqfd2ohvmvi19m0g@group.calendar.google.com'
const API_KEY = 'AIzaSyADfAeEVR7VeH-tTMu9-6TFHSMSEUy8_s0'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

export default class GoogleCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: moment().format('dd, Do MMMM, h:mm A'),
      events: [],
      // isBusy: false,
      // isEmpty: false,
    }
  }

  componentDidMount() {
    console.log('yes')
    this.getEvents()
    setInterval(() => {
      this.tick()
    }, 1000)
    setInterval(() => {
      this.getEvents()
    }, 60000)
  }

  getEvents() {
    const that = this
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
        })
        .then(() => gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
            .endOf('day')
            .toISOString()}`,
        }))
        .then(
          response => {
            const events = response.result.items
            console.log(events)
            const sortedEvents = events.sort((a, b) => (
              moment(b.start.dateTime).format('YYYYMMDD')
                - moment(a.start.dateTime).format('YYYYMMDD')
            ))
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isEmpty: false,
                },
                () => {
                  that.setStatus()
                },
              )
            } else {
              that.setState({
                isBusy: false,
                isEmpty: true,
              })
            }
          },
          reason => {
            console.log(reason)
          },
        )
    }
    gapi.load('client', start)
  }

  tick = () => {
    const time = moment().format('dddd, Do MMMM, h:mm A')
    this.setState({
      time,
    })
  }

  setStatus = () => {
    const now = moment()
    const { events } = this.state
    console.log(events)
    for (let e = 0; e < events.length; e++) {
      const eventItem = events[e]
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime),
        )
      ) {
        this.setState({
          isBusy: true,
        })
        return false
      }
      this.setState({
        isBusy: false,
      })
    }
  }

  render() {
    const { time, events } = this.state
    console.log(events)
    const eventsList = events.map(event => (
      <a
        className="list-group-item"
        href={event.htmlLink}
        target="_blank"
        key={event.id}
        rel="noreferrer"
      >
        {event.summary}
        {' '}
        <span className="badge">
          {moment(event.start.dateTime).format('h:mm a')}
          ,
          {' '}
          {moment(event.end.dateTime).diff(
            moment(event.start.dateTime),
            'minutes',
          )}
          {' '}
          minutes,
          {' '}
          {moment(event.start.dateTime).format('MMMM Do')}
          {' '}
        </span>
      </a>
    ))
    console.log('eventsList', eventsList)

    const emptyState = (
      <div className="empty">
        <h3>
          No meetings are scheduled for the day. Create one by clicking the
          button below.
        </h3>
      </div>
    )

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>OurHouse</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
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
                <Nav.Link href="/login"> Logout </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container">
          <div className="upcoming-meetings">
            <div className="current-time">
              {time}
              , 2021
            </div>
            <h1>Upcoming Meetings</h1>
            <a
              className="primary-cta"
              href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
              target="_blank"
              rel="noreferrer"
            >
              +add an event
            </a>
          </div>
        </div>
        <div className="calendarEvents">
          {eventsList}
        </div>
      </>
    )
  }
}
