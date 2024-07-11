import "./Characters.css";
import { Character } from "../../interfaces";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charResponse = await axios.get('http://localhost:3000/api/characters');
        setCharacters(charResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleCharacterClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  return (
    <div className="characters-design">
      <h1>Resident Evil Characters</h1>
      <div className="characters-container">
        {characters.map(character => (
          <div
            className="character-container"
            key={character.id}
            onClick={() => handleCharacterClick(character.id)}
          >
            <div className="image-container">
              <img src={character.image} alt={character.name} />
              <div className="text-container">
                <b>{character.name}</b><br />
                {character.game}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Characters;
