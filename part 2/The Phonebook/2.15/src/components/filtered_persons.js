const FilteredPersons = (props) => {
    const filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.newSearch.toLowerCase()))
    
    return(
      <>
        <ul>
          {filtered.map(element => <li key={element.id}>{element.name} {element.number} </li>)}
        </ul>
      </>
    )
  }

export default FilteredPersons