import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

// Product Management
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

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`)
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

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

// User Management
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`)
    return response.data.users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/search?q=${query}`)
    return response.data.users
  } catch (error) {
    console.error('Error searching users:', error)
    return []
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    return null
  }
}

// Login Management
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      username,
      password,
      expiresInMins: 30, // Optional
    })

    console.log('Login response:', response.data) // Log the full response for debugging

    const { accessToken, refreshToken } = response.data // Correct key: accessToken
    console.log('Extracted tokens:', accessToken, refreshToken) // Debug tokens

    // Save tokens to local storage if they exist
    if (accessToken) {
      saveToLocalStorage('authToken', accessToken)
    } else {
      console.error('Access token is undefined.')
    }

    if (refreshToken) {
      saveToLocalStorage('refreshToken', refreshToken)
    }

    return response.data
  } catch (error) {
    console.error('Login error:', error)
    throw new Error('Invalid username or password')
  }
}


// Cart Management
export const getCartFromAPI = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data.items || [] // Ensure an array is returned
  } catch (error) {
    console.error('Error fetching cart from API:', error)
    return []
  }
}


export const syncCartToAPI = async (token, cartItems) => {
  try {
    await axios.post(
      `${BASE_URL}/cart`,
      { items: cartItems },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  } catch (error) {
    console.error('Error syncing cart to API:', error)
  }
}


// Token Management
export const refreshToken = async () => {
  const refreshToken = getFromLocalStorage('refreshToken')
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      token: refreshToken,
    })
    const { token, refreshToken: newRefreshToken } = response.data

    // Save updated tokens
    saveToLocalStorage('authToken', token)
    saveToLocalStorage('refreshToken', newRefreshToken)

    return token
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw error
  }
}

// Utilities
export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  try {
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.warn(`Invalid JSON in localStorage key "${key}". Clearing it.`)
    localStorage.removeItem(key)
    return null
  }
}

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getAuthenticatedUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include', // Include cookies if needed
    })
    return response.data // Return user data
  } catch (error) {
    console.error('Error fetching authenticated user:', error)
    return null
  }
}

// Axios Instance with Token Refreshing
const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      } catch (err) {
        console.error('Token refresh failed:', err)
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
