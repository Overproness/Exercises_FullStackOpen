const { gql } = require("@apollo/client");

export const ALL_AUTHORS = gql`query{
    allAuthors{
        name
        born
        bookCount
    }
}`

export const ALL_BOOKS = gql`query{
    allBooks{
        
    }
}`