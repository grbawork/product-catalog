import React, { useEffect, useState } from 'react'
import { getFromLocalStorage } from '../utils/localStorage'
import { getAuthenticatedUser } from '../services/api'

const UserPage = () => {
  const [user, setUser] = useState(null)

useEffect(() => {
  const fetchUser = async () => {
    const token = getFromLocalStorage('authToken')
    if (token) {
      try {
        const userData = await getAuthenticatedUser(token) // Fetch user data
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    } else {
      console.warn('No valid auth token found.')
    }
  }

  fetchUser()
}, [])



  const handleLogout = () => {
    localStorage.removeItem('authToken')
    alert('Logged out successfully!')
    window.location.href = '/login' // Redirect after logout
  }

  return (
    <div className='user-page'>
      <h2>Welcome, {user ? user.firstName : 'Guest'}!</h2>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  )
}

export default UserPage
