import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import axios from 'axios'
import noteService from './services/notes'

import './index.css'



const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A new note')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])



  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    

    noteService.create(noteObject).then(returnedNote =>{
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`

    const note = notes.find(n => n.id === id)

    const changedNote = {...note, important: !note.important}

    noteService.update(id,changedNote).then(change =>{
      setNotes(notes.map(note => note.id !== id? note: changedNote))
    })
    .catch(error => {
      setErrorMessage(`The Note "${note.content}" was already deleted from the server`)

      setTimeout(() =>{
        setErrorMessage(null)
      }, 5000)

      setNotes(notes.filter(n => n.id !== id))
    })

    
  }

  const handleNoteChange = (event) => {
   // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (<div>
    <h1>Notes</h1>
    <Notification message={errorMessage}/>
    <div>
      <button onClick={() => setShowAll(!showAll)}>show {
          showAll
            ? 'important'
            : 'all'
        }</button>
    </div>
    <ul>
      {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance = {() => toggleImportanceOf(note.id)}/>)}
    </ul>
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange}/>
      <button type="submit">Save</button>
    </form>
    <Footer/>
  </div>)

}

export default App;
