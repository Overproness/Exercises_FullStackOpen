import {useEffect, useState} from 'react'
import axios from 'axios'
import FilteredPersons from './components/filtered_persons'
import SearchField from './components/search_field'
import AdditionForm from './components/addition_form'
import phoneService from './services/phone'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNo, setNewNo] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [error, setError] = useState('')
  const checkerName = persons.map(person => person.name)
  const checkerNo = persons.map(person => person.phone)
  
  const hook = () => {
    phoneService
      .getAll()
      .then(reponse => setPersons(reponse))
  }

  useEffect(hook, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(checkerName.includes(newName) || checkerNo.includes(newNo)){
      (checkerName.includes(newName) && checkerNo.includes(newNo))
      ? setError(`The Phonebook already includes both ${newName} and ${newNo}`)
      : checkerName.includes(newName)
      ? setError(`${newName} is already in the phonebook. `)
      : setError(`${newNo} is already in the phonebook. `)
      alert(error)
    }
    else{
      const theObject = {
        name: newName,
        number: newNo,
        id: persons.length + 1
      }
      phoneService
        .add(theObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNo('')
        })
    }
  }
  
  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNo = (event) => {
    setNewNo(event.target.value)
  }

  const handleChangeSearch = (event) => {
    setNewSearch(event.target.value)
  }



  return (
    <>
      <div>
        <h2>Search</h2>
        <SearchField newSearch={newSearch} handleChangeSearch={handleChangeSearch} />
        
        <h3>Add New</h3>
        <AdditionForm handleChangeName={handleChangeName} handleChangeNo={handleChangeNo} handleSubmit={handleSubmit} newName={newName} newNo={newNo} />

        <h2>Phonebook</h2>
        <FilteredPersons persons={persons} newSearch={newSearch} />
      </div>
    </>
  )
}

export default App