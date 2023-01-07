import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNo, setNewNo] = useState('')
  const checkerName = persons.map(person => person.name)
  const checkerNo = persons.map(person => person.phone)
  let error

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(checkerName.includes(newName) || checkerNo.includes(newNo)){
      (checkerName.includes(newName) && checkerNo.includes(newNo))
      ? error = `The Phonebook already includes both ${newName} and ${newNo}`
      : checkerName.includes(newName)
      ? error = `${newName} is already in the phonebook. `
      : error = `${newNo} is already in the phonebook. `
      alert(error)
    }
    else{
      const theObject = {
        name: newName,
        phone: newNo
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

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} >
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNo} onChange={handleChangeNo} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <ul>
        {persons.map(person => 
            <li key={persons.indexOf(person)}>
              {person.name} {person.phone}
            </li>
          )}
      </ul>
    </>
  )
}

export default App