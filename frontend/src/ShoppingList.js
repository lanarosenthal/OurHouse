import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShoppingList = function () {
  const [shopList, setShopList] = useState([])
  const [deleteIt, setItemToDelete] = useState('')
  const [deleteQuant, setQuantToDelete] = useState(0)

  const retrieveItems = async () => {
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

  const deleteItem = async ({ item }) => {
    setItemToDelete(item.item)
    setQuantToDelete(item.quantity)
    const { data } = await axios.post('/shopping/delete', { deleteIt, deleteQuant })
    if (data !== 'item is deleted') {
      window.alert(data)
    }
  }

  return (
    <>
      <h1>Items:</h1>
      {shopList.map(item => (
        <>
          {item.item}
          {item.quantity}
          <button type="submit" onClick={e => deleteItem({ item })}>
            Delete&nbsp;
            {item.item}
          </button>
        </>
      ))}
    </>
  )
}

export default ShoppingList
