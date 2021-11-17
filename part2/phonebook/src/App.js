import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import { filter } from './Components/Filter'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const Submit = (event) => {
    event.preventDefault()
    if(persons.filter((person) => person.name === newName).length>0){
      alert(newName + ' is already added to phonebook')
      return
    }

    const newPersons = persons.concat({
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    })

    setPersons(newPersons)
    filter(searchTerm, newPersons, setFilteredPersons)
  }

  const SearchChange = (event) => {
    setSearchTerm(event.target.value)
    filter(event.target.value, persons, setFilteredPersons)
  }

   return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchChange={SearchChange} />
      <PersonForm numberChange={(event) => setNewNumber(event.target.value)} nameChange={(event) => setNewName(event.target.value)} submit={Submit} />
      <Persons display={filteredPersons}/>
    </div>
  )
}


export default App