import Country from "./country"

const FilteredCountries = (props) => {
  

  
  if(props.searchFilter.length >10 && props.searchFilter.length < 250){
    return(
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }

  else if(props.searchFilter.length <=10 && props.searchFilter.length >1){

    return(
      props.searchFilter.map(
        element => 
          <div key={element.callingCodes}>
            <p>{element.name}<button onClick={() => props.setCountries([element])} >show</button></p>
          </div>
      )
    )
    
  }
  else if(props.searchFilter.length === 1){
    return(
      [props.searchFilter[0]].map(element => <Country searchFilter={element} />)
    )
  }
  }

export default FilteredCountries