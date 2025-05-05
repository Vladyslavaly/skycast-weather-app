import './Footer.css'
import logo from '../assets/logo1.png'
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-container">
        {/* лог */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <img src={logo} alt="SkyCast Logo" className="footer-logo" />
          <h2 className="footer-title m-0">SkyCast</h2>
        </div>

        {/* соц */}
        <div className="footer-socials mb-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:contact@skycast.com" aria-label="Email"><FaEnvelope /></a>
        </div>

        {/* текст */}
        <div className="footer-text text-center">
          <p className="small">© {new Date().getFullYear()} SkyCast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
