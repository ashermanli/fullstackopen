import React from 'react'

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map((person)=> <li key={person.name}>{person.name}</li>)}
    </ul>
  )
}

export default Persons
