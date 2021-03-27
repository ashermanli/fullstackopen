import React from 'react'

const Filter = ({filter,filteredPerson, handleFilter}) =>{
  return(
  <div>
    <div>Find: <input onChange={handleFilter}/> </div>
    <div>{filter === '' ? '': filteredPerson.map(person => <p key={person.name}>{person.name} {person.number} </p>)}</div>
</div>
)
}

export default Filter
