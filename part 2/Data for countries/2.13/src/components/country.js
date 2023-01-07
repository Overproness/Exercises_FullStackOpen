const Country = (props) => {
    return(
        <div key={props.searchFilter.callingCodes}>
            <h1>{props.searchFilter.name}</h1>
            <p>Capital: {props.searchFilter.capital}</p>
            <p>Area: {props.searchFilter.area}</p>
            <h3>Languages:</h3>
            <ul>
            {props.searchFilter.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={props.searchFilter.flag} ></img>
        </div>
    )
}

export default Country