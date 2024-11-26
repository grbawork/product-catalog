import React, { useEffect, useState } from 'react'
import { getUsers, searchUsers, deleteUser } from '../services/api'

const Users = () => {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const data = await getUsers()
    setUsers(data)
    setLoading(false)
  }

  const handleSearch = async () => {
    setLoading(true)
    if (query.trim()) {
      const data = await searchUsers(query)
      setUsers(data)
    } else {
      fetchUsers()
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    )
    if (confirmed) {
      const result = await deleteUser(id)
      if (result) {
        alert(`User ${id} deleted successfully.`)
        setUsers(users.filter((user) => user.id !== id))
      } else {
        alert('Failed to delete the user.')
      }
    }
  }

  return (
    <div className='users'>
      <h2>User Directory</h2>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search users...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.firstName} {user.lastName} ({user.email})
              </span>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Users
