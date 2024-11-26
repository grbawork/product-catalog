import React from 'react'

const Cart = ({ item, onRemove }) => {
  return (
    <div className='cart-item'>
      <img src={item.thumbnail} alt={item.title} />
      <div className='cart-item-details'>
        <h3>{item.title}</h3>
        <p>Price: ${item.price}</p>
      </div>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  )
}

export default Cart
