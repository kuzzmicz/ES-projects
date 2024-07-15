import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Character } from "../../interfaces";
import "./CharacterDetails.css";

interface Comment {
  characterId: number;
  comment: string;
  username: string;
}

function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setFavorite] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username'); 
  const [commentsView, setCommentsView] = useState(false);

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
        if(userId){
          const favoriteCharactersResponse = await axios.get(`http://localhost:3000/api/users/${userId}/favorites`);
          const favoriteCharacters = favoriteCharactersResponse.data;
          setFavorite(favoriteCharacters.some((c: Character) => c.id === parseInt(id, 10)));
        }
      } catch (error) {
        console.error('Error fetching character data', error);
      }
    };

    fetchCharacter();
  }, [id, navigate, userId]);

  const toCommentsClick = () => {
    setCommentsView(!commentsView);
  }

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) {
      console.error('Character ID is undefined');
      return;
    }

    if (userId && username) {
      try {
        await axios.post(`http://localhost:3000/api/characters/${id}/comment`, { userId, comment });
        setComments([...comments, { characterId: parseInt(id, 10), comment, username }]);
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
            setFavorite(true);
            alert('Character added to favorites');
        } catch (error) {
            console.error('Error adding to favorites', error);
        }
    }
};

const handleRemoveFromFavorites = async () => {
  if (!id) {
      console.error("Character ID is undefined");
      return;
  }

  if (userId && character) {
      try {
          await axios.delete(`http://localhost:3000/api/users/${userId}/favorites/${character.id}`);
          alert('Character removed from favorites');
          setFavorite(false);
      } catch (error) {
          console.error('Error removing from favorites', error);
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
          <img src={character.image} alt={character.name} />
        </div>
        <div className="info-container">
          {!commentsView ? (
            <>
              {!isFavorite ? (
                <button onClick={handleAddToFavorites}>⭐</button>
              ) : (
                <button onClick={handleRemoveFromFavorites}>❌</button>
              )}
              <p><b>First appearance: </b>{character.game}</p>
              <p><b>Gender: </b>{character.gender}</p><br />
              <p>{character.desc}</p><br />
              <p><b>Status: </b>{character.status}</p>
            </>
          ) : (
            <>
              <h1>COMMENTS</h1>
              <div className="comments-container">
                <form onSubmit={handleCommentSubmit}>
                  <div className="add-comment-container">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
                    <button type="submit">ADD</button>
                  </div>
                </form>
                <ul>
                  {comments.map((c, index) => (
                    <span className="comment" key={index}>
                      <li><span className="username">{c.username}</span>: {c.comment}</li>
                    </span>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      {commentsView ? (
        <button className="change-view-button" onClick={toCommentsClick}>▲ TO INFORMATION ▲</button>
      ) : (
        <button className="change-view-button" onClick={toCommentsClick}>▲ TO COMMENTS ▲</button>
      )}
    </div>
  );
}

export default CharacterDetails;
