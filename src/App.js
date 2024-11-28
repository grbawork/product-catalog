import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import CartPage from './pages/CartPage'
import Users from './pages/Users'
import UserPage from './pages/UserPage'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
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
