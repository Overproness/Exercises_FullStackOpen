import axios from "axios"
import { useEffect, useState } from "react"

export const useResource = (url) => {
    const [resource, setResource] = useState([])

    const baseUrl = 'http://localhost:3005'

    useEffect(() => {
        axios.get(`${baseUrl}/${url}`).then(response => setResource(response.data))
    }, [])

    const create = async newObj => {
        const response= await axios.post(`${baseUrl}/${url}`, newObj)
        setResource(resource.concat(response.data))
        return response.data
    }

    const service = {

        create
    }

    return[
        resource,
        service
    ]
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = e => {
        setValue(e.target.value)
    }

    return{
        type,
        value,
        onChange
    }
}