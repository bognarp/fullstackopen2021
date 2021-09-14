
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
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
    </div>
  )
}

const Countries = (props) => {
  const { data, onClick } = props

  if (data.length === 1) {
    return (
      <Country country={data[0]} />
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
