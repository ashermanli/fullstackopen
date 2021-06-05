import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = () => <h1>Give Feedback</h1>

const Statistics = ({text, value}) => {

  if(value === 0){
    return (<td>{text}: No Feedback given</td>)
  }

  return (
    <td>
      {text}: {value}
    </td>
  )
}
const Button = ({clickEvent, text}) => {
  return (
    <button onClick={clickEvent}>
      {text}
    </button>
  )
}


const App = () =>{

  const[good, setGood] = useState(0)
  const[neutral, setNeutral] = useState(0)
  const[bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)

  const handleNeutral = () => setNeutral(neutral+1)

  const handleBad = () => setBad(bad+1)

  const total = good+neutral+bad

  const average = total/3

  const positive = good/3

  return (
    <div>
      <Header />
      <Button clickEvent = {handleGood} text='Good'/>
      <Button clickEvent = {handleNeutral} text='Neutral'/>
      <Button clickEvent = {handleBad} text='Bad'/>
      <table><tbody>
      <tr><Statistics text='good' value={good}/></tr>
      <tr><Statistics text='neutral' value={neutral} /></tr>
      <tr><Statistics text='bad' value={bad}/></tr>
      <tr><Statistics text='Average' value={average} /></tr>
      <tr><Statistics text='Positive' value={positive}/></tr>
      </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
