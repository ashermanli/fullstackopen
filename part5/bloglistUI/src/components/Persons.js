import React from 'react'

const Persons = ({persons, handleRemove}) => {
  return (
    <ul>
      {persons == null ?'': 
      persons.map((person)=> <span key = {person.name}>
        <li>
          <div className="Info">
            <h2>{person.name}</h2> 
            <h3>{person.number}</h3>
          </div>
          <button key = {person.id} onClick = {() =>   handleRemove(person.name,person.id)}>Delete</button>
        </li></span>)}
      
    </ul>
  )
}

export default Persons
