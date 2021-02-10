import React from 'react'

const Total = ({parts}) => {


  const total = parts.reduce((sum,part)=> sum + part.exercises, 0)

  console.log('total', total);
  return (<div>
    <p>Number of Exercises {total}</p>
  </div>)
}

export default Total
