import React, { useState, useEffect } from 'react'
import { getFromLocalStorage } from '../utils/localStorage'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const items = getFromLocalStorage('cart') || []
    setCartItems(items)
  }, [])

  return (
    <div className='cart-page'>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className='cart-item'>
            <p>{item.title}</p>
            <p>${item.price}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default CartPage
