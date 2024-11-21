import React from 'react'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage'

const ProductCard = ({ product, onDetailsClick }) => {
  const handleAddToCart = () => {
    const cart = getFromLocalStorage('cart') || []
    saveToLocalStorage('cart', [...cart, product])
    alert('Product added to cart!')
  }

  return (
    <div className='product-card'>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description.slice(0, 100)}...</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => onDetailsClick(product)}>Details</button>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
