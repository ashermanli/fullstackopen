import React from 'react'

const Filter = ({filter,filteredPerson, handleFilter}) =>{
  return(
  <div className='search-box'>
    <div> <h2>Find:</h2> <input onChange={handleFilter}/> </div>
    <div className='search-result'>{filter === '' ? '': filteredPerson.map(person => <p key={person.name}>{person.name} {person.number} </p>)}</div>
</div>
)
}

export default Filter
