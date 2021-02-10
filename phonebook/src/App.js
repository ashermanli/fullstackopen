import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

    const[newName, setNewName] = useState('add a new name')
    const[newNumber, setNewNumber] = useState('add a phone number')
    const [filter, setFilter] = useState('')
    const [filteredPerson, setFilteredPerson] = useState('')

    useEffect(() => {
      axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
    }, [])




  const handleSubmit = (e)=>{
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

      if(persons.some((person) => person.name === newName)){
        alert(`${newName} already exists`)
        return
      }

      if(newName === ''){ alert('Please type a name')
        return
    }

    if(newNumber === ''){
      alert('Please type a number')
      return
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')

  }

  const handleNewName = (e) =>{
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) =>{
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleFilter =(e) =>{
    setFilter(e.target.value)

    //.includes checks to see if an array has the string
    const filtered= persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    setFilteredPerson(filtered)

    console.log(filtered);


  }

  return(
    <div>
      <h2>Phonebook</h2>
    <Filter filter={filter} filteredPerson={filteredPerson} handleFilter={handleFilter} />
    <h3>Add someone new</h3>
    <PersonForm newName = {newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit}/>
    <h2>Numbers</h2>
    <Persons persons={persons} />

    </div>

  )

}

export default App;
