import { useState } from "react"
import axios from "axios"

const FilteredCountries = (props) => {
  const searchFilter = props.countries.filter(element => element.name.toLowerCase().includes(props.newSearch.toLowerCase()))

  
  
  if(searchFilter.length >10 && searchFilter.length < 250){
    return(
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }
  else if(searchFilter.length <=10 && searchFilter.length >1){
    return(
      <>
        {searchFilter.map(element => <p key={element.callingCodes}>{element.name} </p>)}
      </>
    )
  }
  else if(searchFilter.length === 1){
    return(
      <>
        {searchFilter.map(element => <h1 key={element.callingCodes}>{element.name}</h1>)}
        {searchFilter.map(element => <p key={element.callingCodes}>Capital: {element.capital}</p>)}
        {searchFilter.map(element => <p key={element.callingCodes}>Area: {element.area}</p>)}
        <h3>Languages:</h3>
        <ul>
          {searchFilter[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={searchFilter[0].flag} ></img>
      </>
    )
  }
  }

export default FilteredCountries