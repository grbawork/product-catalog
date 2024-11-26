import React from 'react'

const Modal = ({ product, onAddToCart, onClose }) => {
  if (!product) return null

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose()
    }
  }

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          X
        </button>
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        <button className='modal-to-cart-button' onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Modal
