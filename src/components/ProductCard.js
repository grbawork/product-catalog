import React from 'react'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage'

const ProductCard = ({ product, onDetailsClick }) => {
  const handleAddToCart = () => {
    const cart = getFromLocalStorage('cart') || []
    const existingProduct = cart.find((item) => item.id === product.id)

    if (existingProduct) {
      // If product already exists, increase its quantity
      existingProduct.quantity += 1
    } else {
      // Add new product with quantity 1
      cart.push({ ...product, quantity: 1 })
    }

    saveToLocalStorage('cart', cart)
    alert(`${product.title} added to cart!`)
  }

  return (
    <div className='product-card'>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description.slice(0, 100)}...</p>
      <p>Price: ${product.price}</p>
      <div className='product-card-buttons'>
        <button onClick={() => onDetailsClick(product)}>Details</button>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard
