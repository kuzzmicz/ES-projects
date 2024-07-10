import "./Characters.css";
import { Character } from "../../interfaces";
import { useState, useEffect } from "react";
import axios from 'axios';
function Characters(){
    const [characters, setCharacters] = useState<Character[]>([]);
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
    return (
     <div className="characters-design">
         <h1>Resident Evil Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name} - {character.game}</li>
        ))}
      </ul>
     </div>
    )
}

export default Characters;