import React, { useState } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import { filter } from './Components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')

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