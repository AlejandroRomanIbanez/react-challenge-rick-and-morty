import "./App.css";
import React, { useState, useEffect } from "react";
import { characters as charactersRaw } from "./data/characters";
import { Tooltip } from "react-tooltip";
import Card from "./components/Card"

function App() {
  const [characters, setCharacters] = useState(charactersRaw);
  const [filteredCharacters, setFilteredCharacters] = useState(charactersRaw);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [searchBy, setSearchBy] = useState("all");
  console.log("mainFavorites: ", favorites)

  const filterCharacters = (character) => {
    switch(searchBy) {
      case "name":
        return character.full_name.toLowerCase().includes(searchValue.toLowerCase());
      case "superpower":
        return character.super_powers.some(power => power.name.toLowerCase().includes(searchValue.toLowerCase()));
      case "weakness":
        return character.weaknesses.some(weakness => weakness.name.toLowerCase().includes(searchValue.toLowerCase()));
      default:
        return character.full_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          character.super_powers.some(power => power.name.toLowerCase().includes(searchValue.toLowerCase())) ||
          character.weaknesses.some(weakness => weakness.name.toLowerCase().includes(searchValue.toLowerCase()));
    }
  }

  const removeCharacter = (characterToRemove) => {
    setCharacters(characters.filter(character => character !== characterToRemove));
  }

  const toggleFavorite = (character) => {
    if (favorites.includes(character)) {
      setFavorites(favorites.filter(favorite => favorite !== character));
    } else {
      setFavorites([...favorites, character]);
    }
  }

  useEffect(() => {
    setFilteredCharacters(
      characters
        .filter(filterCharacters)
        .sort((a, b) => (favorites.includes(b) - favorites.includes(a)))
    );
  }, [searchValue, searchBy, characters, favorites]);

  return (
    <div className='App'>
      <nav>
        <input onChange={(event) => setSearchValue(event.target.value.trim())}/>
        <select onChange={(event) => setSearchBy(event.target.value)}>
          <option value="all">Select...</option>
          <option value="name">Name</option>
          <option value="superpower">Superpower</option>
          <option value="weakness">Weakness</option>
        </select>
        <button>Search</button>
      </nav>
      <section className='main'>
        {filteredCharacters.map((character, index) => (
          <Card key={index} character={character} onRemove={() => removeCharacter(character)} onToggleFavorite={() => toggleFavorite(character)} favorites={favorites}/>
        ))}
      </section>
    </div>
  );
}

export default App;
