import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

const handleLogin = async (e) => {
  e.preventDefault()

  try {
    const response = await loginUser(username, password)
    if (response.accessToken) {
      console.log('Login successful. Redirecting to User Page...')
      navigate('/user')
    } else {
      setErrorMessage('Login failed. Please try again.')
    }
  } catch (error) {
    console.error('Login error:', error.message)
    setErrorMessage('Invalid username or password')
  }
}


  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  )
}

export default Login
