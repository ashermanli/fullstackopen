import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'
import axios from 'axios'
import personService from './services/person'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react'

const App = () => {

  //intitialize the state
    const [persons, setPersons] = useState([])
    const[newName, setNewName] = useState('add a new name')
    const[newNumber, setNewNumber] = useState('add a phone number')
    const [filter, setFilter] = useState('')
    const [filteredPerson, setFilteredPerson] = useState('')
    const [notification, setNotification] = useState('')

    //get data from the server
    useEffect(() => {
      personService.getAll().then( initList => setPersons(initList))
    }, [])




  //will handle adding and updating entries
  const handleSubmit = (e)=>{
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    //if already exists, grab the person object
    const pers = persons.find(p => p.name === newName)
    //change number if different from saved
    const changedPers = {...pers, number: newNumber}

    if(persons.some((person) => person.name === newName)){

      console.log(persons.filter(person => person.name === newName));
      
      //ask the user if they wish to update the current contact
      if(window.confirm(`Do you want to update the number for ${newName}`)=== true){
        personService.update(pers.id, changedPers).then(newEntry => {
        setPersons(persons.map(person => person.name !== newName ? person: newEntry))
        })

        //set message on success
        setNotification({message: `Entry for ${newName} has been updated`})
        //clear message after some time
        setTimeout(() => {
          setNotification({name:null, status: 'neutral'})
        }, 5000)

        setNewName('')
        setNewNumber('')
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

    //add the new person to the server
    personService.create(newPerson).then(newList => setPersons(persons.concat(newList)))
    //set message on success, then clear after some time
    setNotification({message: `${newName} has been added`})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setNewName('')
    setNewNumber('')

  }

  const handleRemove = (name, id) => {

   if(window.confirm(`Delete phone number for ${name}?`) === true) 
    personService.remove(id).then(del => {
      setPersons(persons.filter(per => per.id !== id))
    }) 
    .catch(error => {
      //if the user does not exist, display an error
      setNotification({error: `"${name}" has already been removed from the server`})

      //update the list so it doesnt show the already removed person
      setPersons(persons.filter(person => person.name !== name))

      //clear the message after some time
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    
  }



  //functions for dealing with the input fields. 
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
      
      <Notification message={notification ? notification.message? notification.message: notification.error:null} 
                    className={notification? notification.message? 'success':'error':null} />
    <Filter filter={filter} filteredPerson={filteredPerson} handleFilter={handleFilter} />
    <h3>Add someone new</h3>
    <PersonForm newName = {newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} handleSubmit={handleSubmit}/>
    <h2>Numbers</h2>
    <Persons persons={persons} handleRemove = {handleRemove} />

    </div>

  )

}

export default App;
