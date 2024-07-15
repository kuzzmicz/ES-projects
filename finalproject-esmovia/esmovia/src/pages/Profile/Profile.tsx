import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import "./Profle.css";
interface Character {
  id: number;
  image: string;
}

interface Game {
  id: number;
  image: string;
}

const Profile: React.FC = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [characterRatings, setCharacterRatings] = useState<{ [key: number]: number }>({});
  const [gameRatings, setGameRatings] = useState<{ [key: number]: number }>({});
  const [characterSortOrder, setCharacterSortOrder] = useState<'asc' | 'desc'>('asc');
  const [gameSortOrder, setGameSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const { username, userId } = useUser();

  if (!username) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritesResponse = await axios.get(`http://localhost:3000/api/users/${userId}/favorites`);
        const favoriteGamesResponse = await axios.get(`http://localhost:3000/api/users/${userId}/favoritesgames`);
        const ratingsResponse = await axios.get(`http://localhost:3000/api/users/${userId}/ratings`);

        setFavoriteCharacters(favoritesResponse.data);
        setFavoriteGames(favoriteGamesResponse.data);
        setCharacterRatings(ratingsResponse.data.characterRatings);
        setGameRatings(ratingsResponse.data.gameRatings);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchData();
  }, [userId]);

  const setRating = async (type: 'character' | 'game', id: number, rating: number) => {
    try {
      await axios.post(`http://localhost:3000/api/users/${userId}/ratings`, {
        characterId: type === 'character' ? id : undefined,
        gameId: type === 'game' ? id : undefined,
        rating
      });

      if (type === 'character') {
        setCharacterRatings(prev => ({ ...prev, [id]: rating }));
      } else {
        setGameRatings(prev => ({ ...prev, [id]: rating }));
      }
      localStorage.setItem(`${type}Rating_${id}`, rating.toString());
    } catch (error) {
      console.log('Error setting rating', error);
      alert('Failed to update rating');
    }
  };

  const getRating = (type: 'character' | 'game', id: number): number => {
    const storedRating = localStorage.getItem(`${type}Rating_${id}`);
    return storedRating ? parseInt(storedRating, 10) : 0;
  };

  const sortFavorites = (favorites: any[], ratings: any, order: 'asc' | 'desc') => {
    return favorites.sort((a, b) => {
      const ratingA = ratings[a.id] || getRating('character', a.id);
      const ratingB = ratings[b.id] || getRating('character', b.id);
      return order === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });
  };

  const sortedCharacters = sortFavorites(favoriteCharacters, characterRatings, characterSortOrder);
  const sortedGames = sortFavorites(favoriteGames, gameRatings, gameSortOrder);

  return (
    <div className="profile-design">
      <h1>Profile</h1>
      <div className="profile-container">
        <div className="user-container">
          <h1>{username}</h1>
          <img src="avatar.png" alt="User Avatar" id="avatar" />
        </div>
        <div className="user-info">
          <h2>Favorite Characters:</h2>
          <div>
            <button onClick={() => setCharacterSortOrder('asc')}>ASC</button>
            <button onClick={() => setCharacterSortOrder('desc')}>DESC</button>
          </div>
          <div className="favorite-items">
            {sortedCharacters.map(character => (
              <div className="favorite-item" key={character.id}>
                <img src={character.image} alt={`Character ${character.id}`} />
                <div>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} onClick={() => setRating('character', character.id, star)}>
                      {star <= (characterRatings[character.id] || getRating('character', character.id)) ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <h2>Favorite Games:</h2>
          <div>
            <button onClick={() => setGameSortOrder('asc')}>ASC</button>
            <button onClick={() => setGameSortOrder('desc')}>DESC</button>
          </div>
          <div className="favorite-items">
            {sortedGames.map(game => (
              <div className="favorite-item" key={game.id}>
                <img src={game.image} alt={`Game ${game.id}`} />
                <div>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} onClick={() => setRating('game', game.id, star)}>
                      {star <= (gameRatings[game.id] || getRating('game', game.id)) ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
