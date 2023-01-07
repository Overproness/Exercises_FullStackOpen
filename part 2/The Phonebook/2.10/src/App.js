import { useState } from 'react'
import FilteredPersons from './components/filtered_persons'
import SearchField from './components/search_field'
import AdditionForm from './components/addition_form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNo, setNewNo] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [error, setError] = useState('')
  const checkerName = persons.map(person => person.name)
  const checkerNo = persons.map(person => person.phone)
  

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
        phone: newNo,
        id: persons.length + 1
      }
      setPersons(persons.concat(theObject))
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