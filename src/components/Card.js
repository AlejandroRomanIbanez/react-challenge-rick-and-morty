import { useState } from "react";
import CardPowers from "./CardInfo/CardPowers";
import CardWeaknesses from "./CardInfo/CardWeaknesses";
import { Tooltip } from 'react-tooltip'


const Card = ({ character, onRemove, onToggleFavorite, favorites }) => {
  const {full_name, super_powers, weaknesses} = character
  console.log("favorites: ", favorites)
  const isFavorite = favorites && favorites.some(favorite => favorite.full_name === full_name);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState(character);
  
  const handleEdit = () => {
    setIsEditing(isEditing => (!isEditing));
  };

  const handleChange = (event, index, type) => {
    const newCharacter = { ...editedCharacter };
    newCharacter[type][index].name = event.target.value;
    setEditedCharacter(newCharacter);
  };

    return (
        <div className='card'>
          <div className='image-container'>
            <img src={`images/${full_name}.jpeg`} className='cardImage' alt='' />
            <button className='icon-button' onClick={onToggleFavorite}>
              <img src={isFavorite ? '/icons/heart-fill.png' : '/icons/heart-empty.png'} alt='heart' />
            </button>
            {/* <button className='icon-button'>
              <img src='/icons/heart-fill.png' alt='heart-fill' />
            </button> */}
          </div>
      {isEditing ? (
        <div className='card-body'>
          {editedCharacter.super_powers.map((power, index) => (
            <div key={index}>
              <input
                value={power.name}
                onChange={(event) => handleChange(event, index, 'super_powers')}
              />
              <input
                value={power.symbol}
                onChange={(event) => handleChange(event, index, 'super_powers')}
              />
            </div>
          ))}
          {editedCharacter.weaknesses.map((weakness, index) => (
            <div key={index}>
              <input
                value={weakness.name}
                onChange={(event) => handleChange(event, index, 'weaknesses')}
              />
              <input
                value={weakness.symbol}
                onChange={(event) => handleChange(event, index, 'weaknesses')}
              />
            </div>
          ))}
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div className='card-body'>
          <h2>{full_name}</h2>
          <CardPowers powers={super_powers}/>
          <CardWeaknesses weaknesses={weaknesses}/>
          <div className='button-container'>
            <button className='secondary-button' onClick={onRemove}>Remove</button>
            <button className='secondary-button' onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;