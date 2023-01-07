import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const checker = persons.map(person => person.name)

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(checker.includes(newName)){
      const error = `${newName} is already in the phonebook. `
      alert(error)
    }
    else{
      const nameObject = {
        name: newName
      }
      setPersons(persons.concat(nameObject))
    }
  }
  
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} >
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </>
  )
}

export default App
