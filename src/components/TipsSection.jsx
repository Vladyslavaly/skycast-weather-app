import { useState, useEffect } from 'react'
import { FaCloud, FaMoon, FaBolt, FaRegPaperPlane, FaCheckCircle } from 'react-icons/fa'
import './TipsSection.css'

const tips = [
  {
    icon: <FaCloud />,
    title: 'Amazing Clouds',
    text: 'Clouds weigh millions but still float gently above our heads today.',
  },
  {
    icon: <FaMoon />,
    title: 'Moonlight Effects',
    text: 'Moon phases shape ocean tides and affect sleep quality in people.',
  },
  {
    icon: <FaBolt />,
    title: 'Lightning Power',
    text: 'Lightning heats air hotter than the sun and hits Earth every second.',
  },
]

const TipsSection = () => {
  const [form, setForm] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.name && form.message) {
      console.log('Form data:', form)

      try {
        const res = await fetch("https://formspree.io/f/mzzrenyq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        })

        if (res.ok) {
          setSubmitted(true)
          setTimeout(() => {
            setSubmitted(false)
            setForm({ name: '', message: '' })
          }, 4000)
        } else {
          alert("Error sending form. Try again.")
        }
      } catch (error) {
        console.error("Form submission error:", error)
        alert("Something went wrong.")
      }
    }
  }

  return (
    <section className="tips-section" id="tips">
      <div className="tips-content">
        <h2 className="tips-title">Daily Weather Curiosities</h2>

        <div className="tips-columns">
          <div className="tip-highlight">
            <div className="tip-icon">{tips[currentTip].icon}</div>
            <h4>{tips[currentTip].title}</h4>
            <p>{tips[currentTip].text}</p>
          </div>

          <div className="tips-form">
            <h3>Got a cool weather fact or question?</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Share your thought or ask something!"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button type="submit">
                <FaRegPaperPlane /> Send
              </button>
              {submitted && (
                <div className="thanks-message">
                  <FaCheckCircle className="thanks-icon" /> Thanks for your input!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TipsSection