import React, { useState, useEffect } from 'react'
import PersonsView from './Components/PersonsView'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import { filter } from './Components/Filter'
import personService from './Services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')

  const hook = () => {
    console.log('effect')
    personService.getAllEntries()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])
  
  function updateState(newPersons){
    setPersons(newPersons)
    setFilteredPersons(filter(searchTerm,newPersons))
  }

  const SubmitHandler = (event) => {
    event.preventDefault()
    let existingPersons = persons.filter((person) => person.name === newName)
    
    let newPerson = {
      name: newName,
      number: newNumber,
    }

    if(existingPersons.length>0){
      if (!window.confirm("Update " + newName)){
        return;
      }
      personService.updateEntry(existingPersons[0].id, newPerson)
      .then(newPerson => {
        let newPersons = persons.filter(person => person.id != newPerson.id).concat(newPerson)
        updateState(newPersons)
      })
      
    } else {
      personService.createEntry(newPerson)
      .then(newPerson => {
        let newPersons = persons.concat(newPerson)
        updateState(newPersons)
      })
    }
  }

  const DeleteHandler = (personToDelete) => {
    if (!window.confirm("Delete " + personToDelete.name)){
      return;
    }
    personService.deleteEntry(personToDelete.id)
      .then(deletedPerson => {
        let newPersons = persons.filter(existingPerson => existingPerson.id !== personToDelete.id)
        console.log(newPersons, deletedPerson)
        updateState(newPersons)
      })
  }

  const SearchChange = (event) => {
    setSearchTerm(event.target.value)
    setFilteredPersons(filter(event.target.value, persons))
  }

   return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchChange={SearchChange} />
      <PersonForm numberChange={(event) => setNewNumber(event.target.value)} nameChange={(event) => setNewName(event.target.value)} submit={SubmitHandler} />
      <PersonsView persons={filteredPersons} deleteHandler={DeleteHandler}/>
    </div>
  )
}


export default App