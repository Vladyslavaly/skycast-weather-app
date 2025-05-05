import { useState } from 'react'
import './AboutSection.css'
import { FaCloudSun, FaMapMarkedAlt, FaUsers } from 'react-icons/fa'

const features = [
  {
    icon: <FaCloudSun className="feature-icon" />,
    title: 'Real-Time Data',
    text: 'Get up-to-the-minute forecasts from anywhere in the world. We monitor conditions constantly to bring you the most current updates.',
    extra: 'SkyCast integrates directly with OpenWeatherMap APIs to ensure each update reflects the very latest conditions – down to the minute.',
  },
  {
    icon: <FaMapMarkedAlt className="feature-icon" />,
    title: 'Worldwide Coverage',
    text: 'From small towns to major cities across the globe, SkyCast offers comprehensive coverage with location-specific forecasts.',
    extra: 'We support over 200,000+ locations across every continent, giving users access to localized forecasts no matter where they go.',
  },
  {
    icon: <FaUsers className="feature-icon" />,
    title: 'Passionate Team',
    text: 'Built by weather enthusiasts, designers, and developers who believe that great design and accurate data can brighten your day.',
    extra: 'Our multidisciplinary team continuously improves SkyCast to offer not just forecasts, but a joyful experience of planning your life.',
  },
]

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleCard = (index) => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <h2 className="about-title">About SkyCast</h2>
        <p className="about-description">
          SkyCast is more than just a weather app — it's a thoughtfully designed digital companion for your daily plans.
          Whether you're heading out for a walk or planning a vacation abroad, SkyCast delivers reliable weather forecasts
          in a visually inspiring and accessible format.
        </p>

        <div className="about-features">
          {features.map((item, index) => (
            <div
              key={index}
              className={`feature-box ${activeIndex === index ? 'expanded' : ''}`}
            >
              {item.icon}
              <h4>{item.title}</h4>
              <p>{item.text}</p>
              <button className="read-more-btn" onClick={() => toggleCard(index)}>
                {activeIndex === index ? 'Close' : 'Read More'}
              </button>
              <div className="feature-extra">
                {activeIndex === index && <p>{item.extra}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection