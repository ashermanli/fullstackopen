import React from 'react'

const Persons = ({persons, handleRemove}) => {
  return (
    <ul>
      {persons.map((person)=> <span key = {person.name}><li>{person.name} {person.number}</li><button key = {person.id} onClick = {() =>   handleRemove(person.name,person.id)}>Delete</button></span>)}
      
    </ul>
  )
}

export default Persons
