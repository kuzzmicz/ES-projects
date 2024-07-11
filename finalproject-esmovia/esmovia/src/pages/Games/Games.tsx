import "./Games.css";
import { Game } from '../../interfaces';
import { useState, useEffect } from "react";
import axios from 'axios';
function Games(){
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const gameResponse = await axios.get('http://localhost:3000/api/games');
            setGames(gameResponse.data);
          } catch (error) {
            console.error('Error fetching data', error);
          }
        };
    
        fetchData();
      }, []);
    return (
     <div className="games-design">
         <h1>Resident Evil Games</h1>
        <div className="games-container">
        {games.map(game => (
          <div key={game.id} className="game-container">{game.title} - {game.releaseYear}
          <img src={game.image}/></div>
        ))}
        </div>
     </div>
    )
}

export default Games;