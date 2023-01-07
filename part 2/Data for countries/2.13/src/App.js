import {useEffect, useState} from 'react'
import axios from 'axios'
import SearchField from './components/search_field'
import FilteredCountries from './components/filtered_countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])


  const handleChangedSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const searchFilter = countries.filter(element => element.name.toLowerCase().includes(newSearch.toLowerCase()))

  return(
    <>
      <SearchField newSearch={newSearch} handleChangedSearch={handleChangedSearch} />
      <FilteredCountries searchFilter={searchFilter} setCountries={setCountries} />
    </>
  )

}

export default App