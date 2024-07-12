import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Character } from "../../interfaces";
import "./CharacterDetails.css";

function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [comments, setComments] = useState<{ characterId: number, comment: string }[]>([]);
  const [comment, setComment] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!id) {
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
      <p><b>First appearance: </b>{character.game}</p>
      <p><b>Gender: </b>{character.gender}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
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
  );
}

export default CharacterDetails;
