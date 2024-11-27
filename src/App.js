import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CartPage from './pages/CartPage'
import Users from './pages/Users'
import UserPage from './pages/UserPage'
import './styles/main.scss' // Ensure global styles are imported

const App = () => {
  return (
    <Router>
      <div className='app'>
        {/* Navigation Bar */}
        <nav className='navbar'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
          <Link to='/cart' className='nav-link'>
            Cart
          </Link>
          <Link to='/users' className='nav-link'>
            Users
          </Link>
          <Link to='/user' className='nav-link'>
            Profile
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/users' element={<Users />} />
          <Route path='/user' element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
