const { gapi } = window
const CLIENT_ID = '832645184952-8goibcvijm4b9vb5lkb5sd6pjab9emv8.apps.googleusercontent.com'
const API_KEY = 'AIzaSyAsbPJGyJ9nV6yxjnIHDXzp-pIqGUwuALQ'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

// export a function that gets start time(date picker), location, name
const addCalendarEvent = (startTime, address, clientName) => {
  console.log(startTime)
  console.log(gapi)
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scopes: SCOPES, 
    })

    gapi.client.load('calendar', 'v3')
    // time zone list:
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    const timeZone = 'Asia/Jerusalem'
    const duration = '00:30:00' // duration of each event, here 30 minuts

    // event start time - im passing datepicker time, and making it match      //with the duration time, you can just put iso strings:
    // 2020-06-28T09:00:00-07:00'

    const startDate = new Date(startTime)
    const msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60 + Number(duration.split(':')[2])) * 1000
    const endDate = new Date(startDate.getTime() + msDuration)
    const isoStartDate = new Date(startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('.')[0]
    const isoEndDate = new Date(endDate.getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toISOString().split('.')[0]

    // sign in with pop up window
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        const event = {
          summary: clientName, // or event name
          location: address, // where it would happen
          start: {
            dateTime: isoStartDate,
            timeZone,
          },
          end: {
            dateTime: isoEndDate,
            timeZone,
          },
          recurrence: [
            'RRULE:FREQ=DAILY;COUNT=1',
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'popup', minutes: 20 },
            ],
          },
        }

        // if you need to list your events than keep it
        gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: (new Date()).toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime',
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })

        const request = gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        })

        // request.execute(event => {
        //   console.log(event)
        //   window.open(event.htmlLink)
        // })
      })
  })
}

export default addCalendarEvent
