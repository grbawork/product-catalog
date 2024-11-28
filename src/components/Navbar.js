import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  const handleOutsideClick = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setMenuOpen(false) // Close the menu if clicked outside
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <nav className='navbar' ref={navRef}>
      {/* Hamburger Menu for Mobile */}
      <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={handleLinkClick}
        >
          Home
        </NavLink>
        <NavLink
          to='/login'
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={handleLinkClick}
        >
          Login
        </NavLink>
        <NavLink
          to='/cart'
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={handleLinkClick}
        >
          Cart
        </NavLink>
        <NavLink
          to='/users'
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={handleLinkClick}
        >
          Users
        </NavLink>
        <NavLink
          to='/user'
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          onClick={handleLinkClick}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
