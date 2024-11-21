import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

// -------------------- PRODUCTS --------------------
/**
 * Fetch all products with optional pagination.
 * @param {number} limit - Number of products to fetch.
 * @param {number} skip - Number of products to skip for pagination.
 * @returns {Promise<Array>} - Array of products.
 */
export const getProducts = async (limit = 30, skip = 0) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    )
    return response.data.products // Return the products array
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Fetch all product categories.
 * @returns {Promise<Array>} - Array of category names.
 */
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`)
    return response.data // Return the categories array
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// -------------------- USERS --------------------
/**
 * Fetch all users with optional pagination.
 * @param {number} limit - Number of users to fetch.
 * @param {number} skip - Number of users to skip for pagination.
 * @returns {Promise<Array>} - Array of users.
 */
export const getUsers = async (limit = 30, skip = 0) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users?limit=${limit}&skip=${skip}`
    )
    return response.data.users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

/**
 * Fetch a single user by ID.
 * @param {number} id - User ID.
 * @returns {Promise<Object>} - User details.
 */
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error)
    return null
  }
}

/**
 * Search users by query.
 * @param {string} query - Search term.
 * @returns {Promise<Array>} - Array of users matching the query.
 */
export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/search?q=${query}`)
    return response.data.users
  } catch (error) {
    console.error('Error searching users:', error)
    return []
  }
}

/**
 * Log in a user.
 * @param {string} username - User's username.
 * @param {string} password - User's password.
 * @param {number} expiresInMins - Token expiration time in minutes.
 * @returns {Promise<Object>} - User details and token.
 */
export const loginUser = async (username, password, expiresInMins = 30) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      username,
      password,
      expiresInMins,
    })
    return response.data
  } catch (error) {
    console.error('Error logging in user:', error)
    return null
  }
}

// -------------------- USER MANAGEMENT --------------------
/**
 * Add a new user (simulated).
 * @param {Object} userData - New user data.
 * @returns {Promise<Object>} - Newly created user.
 */
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/add`, userData)
    return response.data
  } catch (error) {
    console.error('Error adding user:', error)
    return null
  }
}

/**
 * Update a user by ID (simulated).
 * @param {number} id - User ID.
 * @param {Object} userData - Updated user data.
 * @returns {Promise<Object>} - Updated user.
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData)
    return response.data
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error)
    return null
  }
}

/**
 * Delete a user by ID (simulated).
 * @param {number} id - User ID.
 * @returns {Promise<Object>} - Deleted user details.
 */
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error)
    return null
  }
}
