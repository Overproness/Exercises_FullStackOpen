import axios from "axios"
import { useEffect,useState } from "react"

const Country = (props) => {
    const [weather, setWeather] = useState([])
    const apiKey = process.env.REACT_APP_API_KEY
    const hook = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.searchFilter.capital}&appid=${apiKey}`)
        .then(response => {
            const weth = response.data
            setWeather([weth])
            console.log(weth);
            }
        )
    }
    
    useEffect(hook,[])

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
            <h2>Weather in {props.searchFilter.capital}</h2>
            <p>Temperature {weather[0].main.temp - 273}</p>
            <img src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`} ></img>
            <p>Wind {weather[0].wind.speed}</p>
        </div>
    )
}

export default Country