import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

// Fetch all products
export const getProducts = async (limit = 30, skip = 0) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    )
    return response.data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`)
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/category/${category}`
    )
    return response.data.products
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Fetch users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`)
    return response.data.users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Search users
export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/search?q=${query}`)
    return response.data.users
  } catch (error) {
    console.error('Error searching users:', error)
    return []
  }
}

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    return null
  }
}

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials)
    return response.data
  } catch (error) {
    console.error('Error logging in user:', error)
    return null
  }
}

// Fetch a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}

// Search products by query
export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/search?q=${query}`)
    return response.data.products
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

// Add a new product (simulation)
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/add`, product)
    return response.data
  } catch (error) {
    console.error('Error adding product:', error)
    return null
  }
}

// Update a product by ID (simulation)
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    return null
  }
}

// Delete a product by ID (simulation)
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error)
    return null
  }
}
