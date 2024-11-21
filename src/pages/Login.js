import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api' // Ensure this points to your API functions

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate() // React Router hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('') // Reset any previous error message
    try {
      const result = await loginUser(username, password) // Call API function
      if (result) {
        localStorage.setItem('token', result.token) // Save token to localStorage
        alert('Login successful!')
        navigate('/cart') // Redirect to cart after login
      } else {
        setErrorMessage('Invalid username or password.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('An error occurred. Please try again.')
    }
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </div>
  )
}

export default Login
