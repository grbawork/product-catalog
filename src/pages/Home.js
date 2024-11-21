import React, { useState, useEffect } from 'react'
import { getProducts, getCategories } from '../services/api'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import Modal from '../components/Modal'

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts()
      setProducts(productsData)
      setFilteredProducts(productsData)

      const categoriesData = await getCategories()
      setCategories(categoriesData)
    }

    fetchData()
  }, [])

  const handleSearch = (query) => {
    setFilteredProducts(
      products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    )
    setCurrentPage(1)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className='product-grid'>
        {filteredProducts
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailsClick={setSelectedProduct}
            />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      <Modal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}

export default Home
