import React, { useState, useEffect } from 'react'
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const items = getFromLocalStorage('cart') || []
    setCartItems(items)
  }, [])

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    saveToLocalStorage('cart', updatedCart)
  }

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartItems(updatedCart)
    saveToLocalStorage('cart', updatedCart)
  }

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    setCartItems(updatedCart)
    saveToLocalStorage('cart', updatedCart)
  }

  return (
    <div className='cart-page'>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className='cart-item'>
            <img src={item.thumbnail} alt={item.title} />
            <div className='cart-item-details'>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <div className='quantity-controls'>
                <button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </button>
                <button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </button>
              </div>
            </div>
            <button className='remove-button' onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  )
}

export default CartPage
