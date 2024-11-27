import React, { useState, useEffect } from 'react'
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage'
import { getCartFromAPI, syncCartToAPI } from '../services/api'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const token = getFromLocalStorage('authToken') // Check if user is logged in

useEffect(() => {
  const fetchCart = async () => {
    const token = getFromLocalStorage('authToken')
    if (token) {
      try {
        // Fetch cart from backend for logged-in user
        const items = await getCartFromAPI(token)
        setCartItems(items)
      } catch (error) {
        console.error('Error fetching cart from API:', error)
      }
    } else {
      // Fetch cart from local storage for guest user
      const items = getFromLocalStorage('cart') || []
      setCartItems(items)
    }
  }

  fetchCart()
}, [])



  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)

    if (token) {
      // Sync cart with backend for logged-in user
      syncCartToAPI(token, updatedCart)
    } else {
      // Update local storage for guest user
      saveToLocalStorage('cart', updatedCart)
    }
  }

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartItems(updatedCart)

    if (token) {
      syncCartToAPI(token, updatedCart)
    } else {
      saveToLocalStorage('cart', updatedCart)
    }
  }

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    setCartItems(updatedCart)

    if (token) {
      syncCartToAPI(token, updatedCart)
    } else {
      saveToLocalStorage('cart', updatedCart)
    }
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
            <button
              className='remove-button'
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default CartPage
