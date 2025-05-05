import { useState } from 'react'
import './FeaturesSection.css'

const base = '/skycast-weather-app/'

const images = [
  { src: `${base}sun.jpg`, label: 'UV Index' },
  { src: `${base}rain.jpg`, label: 'Rain Radar' },
  { src: `${base}clouds.jpg`, label: 'Cloud Types' },
  { src: `${base}wind.jpg`, label: 'Wind Speed' },
  { src: `${base}snow.jpg`, label: 'Snowfall Map' },
  { src: `${base}storm.jpg`, label: 'Storm Alerts' },
  { src: `${base}fog.jpg`, label: 'Fog Coverage' },
  { src: `${base}moon.jpg`, label: 'Moon Phase' },
  { src: `${base}temperature.jpg`, label: 'Temperature Map' },
  { src: `${base}humidity.jpg`, label: 'Humidity Levels' },
]

const FeaturesSection = () => {
  const [showAll, setShowAll] = useState(false)
  const [modalImg, setModalImg] = useState(null)

  const visibleImages = showAll ? images : images.slice(0, 6)

  const openModal = (img) => {
    setModalImg(img)
  }

  const closeModal = () => {
    setModalImg(null)
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal()
    }
  }

  return (
    <section className="features-section" id="features">
      <h2 className="features-title">Explore More Features</h2>
      <div className="features-gallery">
        {visibleImages.map((img, index) => (
          <div key={index} className="feature-item" onClick={() => openModal(img)}>
            <img src={img.src} alt={img.label} />
            <div className="feature-caption">{img.label}</div>
          </div>
        ))}
      </div>
      <button className="show-more-btn" onClick={() => setShowAll(prev => !prev)}>
        {showAll ? 'Show Less' : 'Show More'}
      </button>

      {modalImg && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <button className="modal-close" onClick={closeModal}>×</button>
          <div className="modal-content">
            <img src={modalImg.src} alt={modalImg.label} />
            <p className="modal-caption">{modalImg.label}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default FeaturesSection