import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
  }, [])

  const handleInput = (e) => {
    console.log(e.target.value)
    setInput(e.target.value)
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(input.toLowerCase()))
    setFiltered(countriesToShow)
  }

  const handleButton = (e) =>{
    console.log(e.target.value)
    setInput(e.target.value)
  }
  return (
    <div>
      <h1>Search for a country: </h1>
  <input value={input} onChange={handleInput}/>

<div>{input === ''? '': filtered.length === 1 ?
  filtered.map(f => <div key={f.name}>
    <h1>{f.name}</h1>
  <p>Capital: {f.capital}</p>
<p>Population: {f.population}</p>
<h2>Languages: </h2>
<ul>{f.languages.map(fl => <li key={fl.name}>{fl.name}</li>)}</ul>
<img src={f.flag} style={{height:'100px', width: '250px'}}/>
    </div>)
      :filtered.length > 10 ? 'Too many countries to show'
      : filtered.map(f => <div key={f.name}><p>{f.name}</p><button type='button' onClick={handleButton} value={f.name}>show</button></div>)}</div>
</div>

  );
}

export default App;
