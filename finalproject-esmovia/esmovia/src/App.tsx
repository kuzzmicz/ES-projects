import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Game, Character } from './interfaces';


const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charResponse = await axios.get('http://localhost:3000/api/characters');
        setCharacters(charResponse.data);

        const gameResponse = await axios.get('http://localhost:3000/api/games');
        setGames(gameResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Resident Evil Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name} - {character.game}</li>
        ))}
      </ul>
      <h1>Resident Evil Games</h1>
      <ul>
        {games.map(game => (
          <li key={game.id}>{game.title} - {game.releaseYear}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
