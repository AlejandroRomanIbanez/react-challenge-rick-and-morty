import React from 'react'
import { Tooltip } from 'react-tooltip'

const CardWeaknesses = ({weaknesses}) => {
  return (
    <>
        <h3>Weaknesses</h3>
        <div className='power-container'>
        {weaknesses.map((weakness) => (
            <>
            <span data-tooltip-id={weakness.name}>{weakness.symbol}</span>
            <Tooltip
            id={weakness.name}
            place='bottom'
            content={weakness.name}
            /></>
            ))}
        </div>
    </>
  )
}

export default CardWeaknesses