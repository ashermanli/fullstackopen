import React from 'react'

const PersonForm = ({newName, handleNewName, newNumber, handleNewNumber, handleSubmit}) =>{


  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
