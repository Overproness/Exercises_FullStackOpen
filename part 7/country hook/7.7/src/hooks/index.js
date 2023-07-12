import { useState, useEffect } from "react"
import axios from 'axios'


export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

    useEffect(() => {
        if(name){
                axios.get(`${baseUrl}/${name}`).then(response => {
                setCountry(response.data)
            }).catch(error => console.log(error))
        }
    }, [name])
  
    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }