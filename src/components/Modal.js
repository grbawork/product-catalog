import React from 'react'

const Modal = ({ product, onClose }) => {
  if (!product) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          X
        </button>
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
      </div>
    </div>
  )
}

export default Modal
