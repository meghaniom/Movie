import React, { useContext } from 'react'
import { BioContext } from './BioContext'

const Ahot = () => {
    const {name, age} = useContext(BioContext);
  return (
    <div>
        <h1>Ahot Component</h1>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>This is a component that uses context to display data.</p>
    </div>
  )
}

export default Ahot