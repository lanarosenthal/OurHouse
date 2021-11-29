import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BillsList = function () {
  const [billList, setBillList] = useState([])
  const [_id, setID] = useState('')

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

  const togglePaid = async ({ bill }) => {
    setID(bill._id)
    const { data } = await axios.post('/bills/update', { _id })
    if (data !== 'bill has been paid') {
      window.alert(data)
    }
  }

  return (
    <>
      <h1>Bills:</h1>
      {billList.map(bill => (
        <>
          {bill.billType}
          {bill.amount}
          {bill.dateDue}
          {bill.paid}
          <button type="submit" onClick={e => togglePaid({ bill })}>Mark as Paid</button>
        </>
      ))}
    </>
  )
}

export default BillsList
