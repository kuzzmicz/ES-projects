import "./GameDetails.css";
import axios from "axios";
import { Game } from "../../interfaces";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";

function GameDetails(){
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);
    const [comments, setComments] = useState<{gameId: number, comment: string}[]>([]);
    const userId = localStorage.getItem('userId');
    const [comment, setComment] = useState('');
    useEffect(()=>{
    if(!id){
        console.log('Game Id is undefined');
        navigate('/');
        return;
    }

    const fetchGame = async () => {
     try {
    const charResponses = await axios.get(`http://localhost:3000/api/games/${id}`);
       setGame(charResponses.data);
       const commentsResponse = await axios.get(`http://localhost:3000/api/games/${id}/comments`); 
      setComments(commentsResponse.data);
    }
  catch (error){
    console.log(`Error fetching game data`, error);
  }
    };
    fetchGame();
    }, [id, navigate]);

    const handleCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!id) {
            console.log('Game ID is undefined');
            return;
        }
        if(userId){
            try{
                await axios.post(`http://localhost:3000/api/games/${id}/comment`, { userId, comment });
            setComments([...comments, {gameId: parseInt(id, 10), comment}]);
            setComment('');
            }
            catch (error){
                console.log('Error adding comment', error);

            }
        }
    };

    const handleAddToFavorites = async () => {
        if(!id){
            console.error("Game ID is undefined");
            return;
        }

        if(userId && game){
            try{
                await axios.post(`http://localhost:3000/api/users/${userId}/favoritesGames`, {gameId: game.id });
                alert('Character added to favorites');
            }  
            catch(error){
                console.error('Error adding to favorites', error);
            }
        }
    };

    if(!game){
        return <div>Loading...</div>;
    }
    return (
        <div className="game-details-design">
            <div className="game-details-container">
            <div className="image-name-game-container">
            <h1>{game.title}</h1>
            <img src={game.image}/> 
            </div>
            <div className="info-game-container"> 
            <button onClick={handleAddToFavorites}>⭐</button>
            <p><b>Release year: </b>{game.releaseYear}</p><br/>
            <p>{game.desc}</p>
            
            
            </div></div>
            <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>{c.comment}</li>
        ))}
      </ul>
        </div>

    )
}

export default GameDetails;