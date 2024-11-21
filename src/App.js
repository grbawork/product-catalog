import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CartPage from './pages/CartPage'
import Users from './pages/Users'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
