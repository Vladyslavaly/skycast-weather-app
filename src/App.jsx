import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import Footer from './components/Footer'
import AboutSection from './components/AboutSection'
import TipsSection from './components/TipsSection'
import FeaturesSection from './components/FeaturesSection'

import {
  WiThermometer,
  WiHumidity,
  WiBarometer,
  WiStrongWind,
  WiSunrise,
  WiSunset
} from 'react-icons/wi'

function App() {
  const [city, setCity] = useState('')
  const [currentWeather, setCurrentWeather] = useState(null)
  const [dailyForecast, setDailyForecast] = useState([])
  const [error, setError] = useState(null)
  const [headerIcon, setHeaderIcon] = useState(null)

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!city) {
      setError('Enter city name')
      setCurrentWeather(null)
      setDailyForecast([])
      return
    }

    try {
      setError(null)
      const apiKey = import.meta.env.VITE_API_KEY

      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`
      const currentRes = await fetch(currentUrl)
      if (!currentRes.ok) throw new Error('City not found')
      const currentData = await currentRes.json()

      setCurrentWeather({
        name: currentData.name,
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        description: currentData.weather[0].description,
        wind: currentData.wind.speed,
        icon: currentData.weather[0].icon,
      })
      setHeaderIcon(currentData.weather[0].icon)

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ua`
      const forecastRes = await fetch(forecastUrl)
      const forecastData = await forecastRes.json()

      const groupedForecast = {}

      forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]
        if (!groupedForecast[date]) {
          groupedForecast[date] = []
        }
        groupedForecast[date].push(item)
      })

      const dailyData = Object.keys(groupedForecast).map(date => {
        const items = groupedForecast[date]
        const temps = items.map(i => i.main.temp)
        const tempMin = Math.min(...temps)
        const tempMax = Math.max(...temps)
        const midday = items.find(i => i.dt_txt.includes('12:00:00')) || items[0]

        return {
          date,
          tempMin: Math.round(tempMin),
          tempMax: Math.round(tempMax),
          icon: midday.weather[0].icon,
          description: midday.weather[0].main
        }
      }).slice(0, 7)

      setDailyForecast(dailyData)

    } catch (err) {
      setError(err.message)
      setCurrentWeather(null)
      setDailyForecast([])
    }
  }

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const apiKey = import.meta.env.VITE_API_KEY

      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ua`)
        if (!res.ok) throw new Error("Location weather fetch failed")
        const data = await res.json()

        setCity(data.name)
        setCurrentWeather({
          name: data.name,
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          description: data.weather[0].description,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        })
        setHeaderIcon(data.weather[0].icon)

        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ua`)
        const forecastData = await forecastRes.json()

        const groupedForecast = {}
        forecastData.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0]
          if (!groupedForecast[date]) groupedForecast[date] = []
          groupedForecast[date].push(item)
        })

        const dailyData = Object.keys(groupedForecast).map(date => {
          const items = groupedForecast[date]
          const temps = items.map(i => i.main.temp)
          const tempMin = Math.min(...temps)
          const tempMax = Math.max(...temps)
          const midday = items.find(i => i.dt_txt.includes('12:00:00')) || items[0]

          return {
            date,
            tempMin: Math.round(tempMin),
            tempMax: Math.round(tempMax),
            icon: midday.weather[0].icon,
            description: midday.weather[0].main
          }
        }).slice(0, 7)

        setDailyForecast(dailyData)
      } catch (err) {
        alert("Could not fetch weather for your location.")
        console.error(err)
      }
    }, () => {
      alert("Permission denied or location unavailable")
    })
  }

  const resetToHome = () => {
    setCity('')
    setCurrentWeather(null)
    setDailyForecast([])
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-wrapper">
      <Header icon={headerIcon} onReset={resetToHome} />
      <main className="main-content">
        <div className="container py-4">
          {(!currentWeather && dailyForecast.length === 0) && (
            <div className="hero-section">
              <h1 className="animated-gradient-title">Weather Forecast</h1>
              <div className="searchbar-wrapper">
                <SearchBar city={city} setCity={setCity} onSearch={handleSearch} onLocate={handleLocate} />
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
              <a href="#about" className="scroll-down-arrow" aria-label="Scroll to About Section">
                <span className="arrow-icon">↓</span>
              </a>
              <div id="about">
                <AboutSection />
              </div>
              <div id="features">
                <FeaturesSection />
              </div>
              <div id="tips">
                <TipsSection />
              </div>
            </div>
          )}

          {(currentWeather && dailyForecast.length > 0) && (
            <>
              <h1 className="animated-gradient-title small-title">Weather Forecast</h1>
              <div className="searchbar-weather">
                <SearchBar city={city} setCity={setCity} onSearch={handleSearch} onLocate={handleLocate} />
              </div>
              <div className="weather-row mt-4 mb-5">
                <div className="current-weather">
                  <h3 className="city-name">{currentWeather.name}</h3>
                  <div className="weather-info-horizontal">
                    <div className="weather-main">
                      <h2>{currentWeather.temp}°C</h2>
                      <p className="description">{currentWeather.description}</p>
                    </div>
                    <img
                      src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                      alt={currentWeather.description}
                      className="weather-icon"
                    />
                  </div>
                  <div className="weather-stats">
                    <p><WiThermometer size={24} /> Feels like: {currentWeather.feels_like}°C</p>
                    <p><WiHumidity size={24} /> Humidity: {currentWeather.humidity}%</p>
                    <p><WiBarometer size={24} /> Pressure: {currentWeather.pressure} hPa</p>
                    <p><WiStrongWind size={24} /> Wind: {currentWeather.wind} m/s</p>
                    <p><WiSunrise size={24} /> Sunrise: {formatTime(currentWeather.sunrise)}</p>
                    <p><WiSunset size={24} /> Sunset: {formatTime(currentWeather.sunset)}</p>
                  </div>
                </div>

                <div className="forecast-container">
                  <h3 className="text-center mb-3">7-Day Forecast</h3>
                  <div className="forecast-strip">
                    {dailyForecast.map((item, index) => {
                      const day = new Date(item.date).toLocaleDateString('en-GB', { weekday: 'short' })
                      return (
                        <div className="forecast-day" key={index}>
                          <p className="day">{day}</p>
                          <img
                            src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                            alt={item.description}
                            width="48"
                          />
                          <p className="description">{item.description}</p>
                          <p className="temp">{item.tempMax}° / {item.tempMin}°</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
