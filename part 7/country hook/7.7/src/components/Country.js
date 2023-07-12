const Country = ({ country }) => {
    if (!country) {
      return (
        <div>
          not found...
        </div>
      )
    }
  
    return (
      <div>
        <h3>{country.name.official} </h3>
        <div>capital {country.capital} </div>
        <div>population {country.population}</div> 
        <img src={country.flags.png} height='100' alt={`flag of ${country.name.official}`}/>  
      </div>
    )
  }

export default Country