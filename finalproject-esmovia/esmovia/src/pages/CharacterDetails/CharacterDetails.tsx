import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Character } from "../../interfaces";
import "./CharacterDetails.css";

function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setFavorite] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);
  const [comments, setComments] = useState<{ characterId: number, comment: string }[]>([]);
  const [comment, setComment] = useState('');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const [commentsView, setCommentsView] = useState(false);

  useEffect(() => {
    if (!id) {
      console.log("Id: " + userId);
      console.error('Character ID is undefined');
      navigate('/');  
      return;
    }

    const fetchCharacter = async () => {
      try {
        const charResponse = await axios.get(`http://localhost:3000/api/characters/${id}`);
        setCharacter(charResponse.data);

        const commentsResponse = await axios.get(`http://localhost:3000/api/characters/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching character data', error);
      }
    };

    fetchCharacter();
  }, [id, navigate]);

  const toCommentsClick = () => {
    setCommentsView(!commentsView);
}

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) {
      console.error('Character ID is undefined');
      return;
    }

    if (userId) {
      try {
        await axios.post(`http://localhost:3000/api/characters/${id}/comment`, { userId, comment });
        setComments([...comments, { characterId: parseInt(id, 10), comment }]);
        setComment('');
      } catch (error) {
        console.error('Error adding comment', error);
      }
    }
  };

  const handleAddToFavorites = async () => {

    if (!id) {
      console.error('Character ID is undefined');
      return;
    }
  
    if (userId && character) {
      try {
        await axios.post(`http://localhost:3000/api/users/${userId}/favorites`, { characterId: character.id });
        alert('Character added to favorites');
        setFavorite(true);
      } catch (error) {
        console.error('Error adding to favorites', error);
      }
    }
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-details-design">
      <div className="character-details-container">
      <div className="image-name-container">
      <h1>{character.name}</h1>
      <img src={character.image}/>
      </div>
      <div className="info-container">

      {!commentsView ? (
        <>
        
      {!isFavorite  ? (
        <>
      <button onClick={handleAddToFavorites}>⭐</button>
      </>
      ) :(
        <>
        <button onClick={handleAddToFavorites}>❌</button>
        </>
      )}
      
      <p><b>First appearance: </b>{character.game}</p>
      <p><b>Gender: </b>{character.gender}</p><br/>
      <p>{character.desc}</p><br/>
      <p><b>Status: </b>{character.status}</p>
      </>
      ) : (
        <>
        <h1>COMMENTS</h1>
        <div className="comments-container">
        <form onSubmit={handleCommentSubmit}>
<textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
<button type="submit" className="add-comment-button">ADD</button>
</form>
<ul>
{comments.map((c, index) => (
  <span className="comment"><li key={index}><span className="username">{username}</span>: {c.comment}</li></span>
))}
</ul></div>
        </>
    )}

      </div></div>

      {commentsView ? (
             <>
             <button className="change-view-button" onClick={toCommentsClick}>▲ TO INFORMATION ▲</button>
             </>
            ) : (
             <>
                <button className="change-view-button" onClick={toCommentsClick}>▲ TO COMMENTS ▲</button>
               </>
            ) 
            
        
        }
      
    </div>
  );
}

export default CharacterDetails;
