import React, { useState, useEffect } from 'react'
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from '../services/api'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import ProductCard from '../components/ProductCard'
import '../styles/main.scss'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage'

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [sortOption, setSortOption] = useState('')
  const itemsPerPage = 20

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
        setFilteredProducts(productsData)

        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleAddToCart = (product) => {
    const cart = getFromLocalStorage('cart') || []
    saveToLocalStorage('cart', [...cart, product])
    alert(`${product.title} added to cart!`)
  }


  const handleCategoryChange = async (category) => {
    setSelectedCategory(category)
    let filteredByCategory = products
    if (category !== '') {
      const categoryProducts = await getProductsByCategory(category)
      filteredByCategory = categoryProducts
    }

    const [min, max] = priceRange.split('-').map((value) => parseInt(value, 10))

    const filteredByCategoryAndPrice = filteredByCategory.filter((product) => {
      if (priceRange === '') return true
      if (max) {
        return product.price >= min && product.price <= max
      }
      return product.price >= min
    })

    setFilteredProducts(filteredByCategoryAndPrice)
    setCurrentPage(1)
  }

  const handlePriceRangeChange = (range) => {
    setPriceRange(range)
    if (range === '') {
      setFilteredProducts(products)
      setCurrentPage(1)
      return
    }

    const [min, max] = range.split('-').map((value) => parseInt(value, 10))
    const filteredByPrice = products.filter((product) => {
      if (max) {
        return product.price >= min && product.price <= max
      }
      return product.price >= min
    })

    setFilteredProducts(filteredByPrice)
    setCurrentPage(1)
  }

  const handleSortChange = (option) => {
    setSortOption(option)
    const sorted = [...filteredProducts].sort((a, b) => {
      if (option === 'price-asc') return a.price - b.price
      if (option === 'price-desc') return b.price - a.price
      if (option === 'name-asc') return a.title.localeCompare(b.title)
      if (option === 'name-desc') return b.title.localeCompare(a.title)
      return 0
    })
    setFilteredProducts(sorted)
  }

  const handleSearch = (query) => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setSelectedCategory('')
    setPriceRange('')
    setSortOption('')
    setFilteredProducts(products)
    setCurrentPage(1)
  }


  return (
    <div className='home'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search for products...'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className='filter-bar'>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value=''>All Categories</option>
          {categories.map((category) =>
            typeof category === 'string' ? (
              <option key={category} value={category}>
                {category}
              </option>
            ) : (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            )
          )}
        </select>

        <select
          value={priceRange}
          onChange={(e) => handlePriceRangeChange(e.target.value)}
        >
          <option value=''>All Price Ranges</option>
          <option value='10-50'>10$ - 50$</option>
          <option value='50-100'>50$ - 100$</option>
          <option value='100-'>100$+</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value=''>Sort By</option>
          <option value='price-asc'>Price: Low to High</option>
          <option value='price-desc'>Price: High to Low</option>
          <option value='name-asc'>Name: A-Z</option>
          <option value='name-desc'>Name: Z-A</option>
        </select>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <div className='product-grid'>
        {filteredProducts
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailsClick={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onAddToCart={handleAddToCart} // Pass Add to Cart functionality to Modal
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default Home
