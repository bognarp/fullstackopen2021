
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInfo = ({ data }) => {
  
  if (data.length !== 0) {
    return (
      <>
        <h3>Weather</h3>
        <img alt="weather" src={data.current.weather_icons[0]} />
        <p>{data.current.weather_descriptions[0]}</p>
        <p>temperature: {data.current.temperature}</p>
        <p>wind speed: {data.current.wind_speed}</p>
      </>
    )
  }

  return (<></>)
}

const CountryInfo = ({ country }) => {
  const [weatherData, setWeatherData] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.name}`)
      .then(request => {
        setWeatherData(request.data)
      })
  }, [])


  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img alt="flag" src={country.flag} />
      <WeatherInfo data={weatherData} />
    </div>
  )
}

const Countries = (props) => {
  const { data, onClick } = props

  if (data.length === 1) {
    return (
      <CountryInfo country={data[0]} />
    )
  }

  if (data.length > 10) {
    return (<p>Too many matches, specify another filter.</p>)
  }

  return (
    <div>
      {data.map(country => {
        return (
          <p key={country.name}>
            {country.name}
            <button onClick={onClick}>show</button>
          </p>
        )
      })}
    </div>
  )
}

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [countryQuery, setCountryQuery] = useState('')
  const filteredCountries = countryData.filter(country => country.name.toUpperCase().includes(countryQuery.toUpperCase()))

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag")
      .then(request => {
        setCountryData(request.data)
      })
  }, [])


  const handleQueryInput = (event) => {
    setCountryQuery(event.target.value)
  }

  const handleShowOnClick = (event) => {
    setCountryQuery(event.target.previousSibling.textContent)
  }

  return (
    <div>
      find countries: <input value={countryQuery} onInput={handleQueryInput} />
      {countryQuery ? <Countries data={filteredCountries} onClick={handleShowOnClick} /> : <></>}
    </div>
  )
}

export default App;
