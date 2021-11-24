import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchListView from './Components/SearchListView'
import SingleEntryView from './Components/SingleEntryView'
import SearchBar from './Components/SearchBar'
import WeatherView from './Components/WeatherView'


const App = () => {

  const api_key = process.env.REACT_APP_API_KEY

  const [allCountries, setAllCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [weatherData, setWeatherData] = useState({})

  function retrieveAndSetWeatherData(cityName){
    axios
    .get("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+api_key)
    .then(response => {
      setWeatherData(response.data)
    })
  }

  const TestSets = () => {
    console.log("test set",searchResults)
  }

  const InitialEffect = () => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setAllCountries(response.data)
    })
  }

  const OnChange = (event) => {
    let filteredResults = allCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setSearchResults(filteredResults)
    if(filteredResults.length === 1){
      retrieveAndSetWeatherData(filteredResults[0].capital[0])
    }
  }

  const OnButtonClick = (entries) => {
    setSearchResults(entries)
    if(entries.length === 1){
      retrieveAndSetWeatherData(entries[0].capital[0])
    }
  }

  useEffect(InitialEffect, [])
  useEffect(TestSets, [searchResults])

  return (
    <div>
      <SearchBar handleChange={OnChange}/>
      <SearchListView searchResults={searchResults} handleClick={OnButtonClick} />
      <SingleEntryView searchResults={searchResults}/>
      <WeatherView weatherData={weatherData}/>
    </div>
  )
}

export default App;
