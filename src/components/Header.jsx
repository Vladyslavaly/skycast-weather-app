import { useState } from 'react'
import './Header.css'
import logo from '../assets/logo1.png'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = ({ background, onReset }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (onReset) onReset()
    setMenuOpen(false)
  }

  return (
    <header className="header shadow-sm fixed-top w-100" style={{ background }}>
      <div className="header-container d-flex justify-content-between align-items-center px-4">
        {/* лог */}
        <div
          className="d-flex align-items-center gap-3"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="SkyCast Logo" className="header-logo" />
          <span className="header-title m-0">SkyCast</span>
        </div>

        {/* кнопка */}
        <button className="burger-btn" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* нав */}
        <nav className={`header-links ${menuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>FEATURES</a>
          <a href="#tips" onClick={() => setMenuOpen(false)}>TIPS</a>
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            SOURCE
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header