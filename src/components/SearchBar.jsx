import { FaSearch, FaCrosshairs } from 'react-icons/fa'

function SearchBar({ city, setCity, onSearch, onLocate }) {
  return (
    <form onSubmit={onSearch} className="search-form">
      <div className="input-wrapper">
        <input
          type="text"
          className="fancy-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="fancy-button" type="submit">
          <FaSearch style={{ marginRight: '8px' }} />
          Search
        </button>

        <button
          type="button"
          className="fancy-button"
          onClick={onLocate}
          aria-label="Use My Location"
        >
          <FaCrosshairs style={{ marginRight: '8px' }} />
          Use My Location
        </button>
      </div>
    </form>
  )
}

export default SearchBar