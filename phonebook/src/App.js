import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/person'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])

    const[newName, setNewName] = useState('add a new name')
    const[newNumber, setNewNumber] = useState('add a phone number')
    const [filter, setFilter] = useState('')
    const [filteredPerson, setFilteredPerson] = useState('')

    useEffect(() => {
      personService.getAll().then( initList => setPersons(initList))
    }, [])




  const handleSubmit = (e)=>{
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const pers = persons.find(p => p.name === newName)

    const changedPers = {...pers, number: newNumber}

    if(persons.some((person) => person.name === newName)){

      console.log(persons.filter(person => person.name === newName));
      
      if(window.confirm(`Do you want to update the number for ${newName}`)=== true){
        personService.update(pers.id, changedPers).then(newList => {
        setPersons(persons.map(person => person.name !== newName ? person: newList))
        })
        return
      }
      else return;
  
    }

    if(newName === ''){ alert('Please type a name')
        return
    }

    if(newNumber === ''){
      alert('Please type a number')
      return
    }

    personService.create(newPerson).then(newList => setPersons(persons.concat(newList)))
    setNewName('')
    setNewNumber('')

  }

  const handleRemove = (name, id) => {

   if(window.confirm(`Delete phone number for ${name}?`) === true) 
    personService.remove(id).then(del => {
      setPersons(persons.filter(per => per.id !== id))
    }) 
    
  }

  // const handleUpdate = (name, id, newNumber) => {
  //   if(persons.filter(person => person.name === name)){
  //     if(window.confirm(`Do you want to update the number for ${name}`)=== true){
  //       personService.update(id, newNumber).then(newList => {
  //        setPersons(persons.map(person => {
  //          person.id !== id ? person: person.concat({...person, number: newNumber})
  //        }))
  //       })
  //     }
  //     else return;
  //   }
    
  // }

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

    // console.log(filtered);


  }

  return(
    <div>
      <h2>Phonebook</h2>
    <Filter filter={filter} filteredPerson={filteredPerson} handleFilter={handleFilter} />
    <h3>Add someone new</h3>
    <PersonForm newName = {newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit}/>
    <h2>Numbers</h2>
    <Persons persons={persons} handleRemove = {handleRemove} />

    </div>

  )

}

export default App;
