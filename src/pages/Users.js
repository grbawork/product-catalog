import React, { useEffect, useState } from 'react'
import { getUsers, searchUsers, deleteUser } from '../services/api'

const Users = () => {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const handleSearch = async () => {
    if (query.trim()) {
      const data = await searchUsers(query)
      setUsers(data)
    } else {
      fetchUsers()
    }
  }

  const handleDelete = async (id) => {
    const result = await deleteUser(id)
    if (result) {
      alert(`User ${id} deleted successfully.`)
      fetchUsers()
    }
  }

  return (
    <div className='users'>
      <h2>Users</h2>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search users...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.email})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
