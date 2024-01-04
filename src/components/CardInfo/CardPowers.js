import React from 'react'
import { Tooltip } from 'react-tooltip'

function CardPowers({ powers }) {
    console.log(powers)
  return (
    <>
    <h3>Superpowers</h3>
    <div className='power-container'>
    {powers.map((power) => (
        <>
        <span data-tooltip-id={power.name}>{power.symbol}</span>
        <Tooltip
        id={power.name}
        place='bottom'
        content={power.name}
        /></>
        
        ))}
        </div>
        </>
    
  )
}

export default CardPowers