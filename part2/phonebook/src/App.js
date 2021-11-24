import React, { useState, useEffect } from 'react'
import PersonsView from './Components/PersonsView'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import { filter } from './Components/Filter'
import personService from './Services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')
  const [ notification, setNotification] = useState('')
  const [ notificationType, setNotificationType] = useState('')

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

  function notify(message, type){
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType('')
    }, 5000)
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
      .then( updatedPerson => {
        let newPersons = persons.filter(person => person.id !== updatedPerson.id).concat(updatedPerson)
        updateState(newPersons)
        notify('Updated ' + newPerson.name, 'confirmation')
      }).catch(error => {
        notify('Could not update ' + newPerson.name, 'error')
      })
      
    } else {
      personService.createEntry(newPerson)
      .then(createdPerson => {
        let newPersons = persons.concat(createdPerson)
        updateState(newPersons)
        notify('Created ' + newPerson.name, 'confirmation')
      })
    }
  }

  const DeleteHandler = (personToDelete) => {
    if (!window.confirm("Delete " + personToDelete.name)){
      return;
    }
    personService.deleteEntry(personToDelete.id)
      .then( () => {
        let newPersons = persons.filter(existingPerson => existingPerson.id !== personToDelete.id)
        updateState(newPersons)
        notify('Deleted ' + personToDelete.name, 'confirmation')
      }).catch(error => {
        notify('Could not delete ' + personToDelete.name, 'error')
        personService.getAllEntries()
        .then(initialPersons => {
          setPersons(initialPersons)
          setFilteredPersons(initialPersons)
        })
      })
  }

  const SearchChange = (event) => {
    setSearchTerm(event.target.value)
    setFilteredPersons(filter(event.target.value, persons))
  }

   return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter searchChange={SearchChange} />
      <PersonForm numberChange={(event) => setNewNumber(event.target.value)} nameChange={(event) => setNewName(event.target.value)} submit={SubmitHandler} />
      <PersonsView persons={filteredPersons} deleteHandler={DeleteHandler} />
    </div>
  )
}


export default App