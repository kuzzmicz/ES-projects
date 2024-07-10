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
         <div className="characters-container">
        {characters.map(character => (
            <div className="character-container" key={character.id}>
          <div className="image-container"><img src={character.image}/><div className="text-container"><b>{character.name}</b><br/>{character.game}<br/>{character.gender}</div>
            </div>
          </div>
        ))}
        </div>
     </div>
    )
}

export default Characters;