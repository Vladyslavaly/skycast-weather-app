import { useState } from 'react'
import './FeaturesSection.css'

const images = [
  { src: '/sun.jpg', label: 'UV Index' },
  { src: '/rain.jpg', label: 'Rain Radar' },
  { src: '/clouds.jpg', label: 'Cloud Types' },
  { src: '/wind.jpg', label: 'Wind Speed' },
  { src: '/snow.jpg', label: 'Snowfall Map' },
  { src: '/storm.jpg', label: 'Storm Alerts' },
  { src: '/fog.jpg', label: 'Fog Coverage' },
  { src: '/moon.jpg', label: 'Moon Phase' },
  { src: '/temperature.jpg', label: 'Temperature Map' },
  { src: '/humidity.jpg', label: 'Humidity Levels' },
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