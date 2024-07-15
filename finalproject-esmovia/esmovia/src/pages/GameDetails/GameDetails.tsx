import "./GameDetails.css";
import axios from "axios";
import { Game } from "../../interfaces";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Comment {
    gameId: number;
    comment: string;
    username: string;
}

function GameDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [commentsView, setCommentsView] = useState(false);
    const [game, setGame] = useState<Game | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [comment, setComment] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!id) {
            console.log('Game Id is undefined');
            navigate('/');
            return;
        }

        const fetchGame = async () => {
            try {
                const gameResponse = await axios.get(`http://localhost:3000/api/games/${id}`);
                setGame(gameResponse.data);
                const commentsResponse = await axios.get(`http://localhost:3000/api/games/${id}/comments`);
                setComments(commentsResponse.data);

                if (userId) {
                    const favoriteGamesResponse = await axios.get(`http://localhost:3000/api/users/${userId}/favoritesgames`);
                    const favoriteGames = favoriteGamesResponse.data;
                    setIsFavorite(favoriteGames.some((g: Game) => g.id === parseInt(id, 10)));
                }
            } catch (error) {
                console.log(`Error fetching game data`, error);
            }
        };
        fetchGame();
    }, [id, navigate, userId]);

    const toCommentsClick = () => {
        setCommentsView(!commentsView);
    };

    const handleCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!id) {
            console.log('Game ID is undefined');
            return;
        }
        if (userId && username) {
            try {
                await axios.post(`http://localhost:3000/api/games/${id}/comment`, { userId, comment });
                setComments([...comments, { gameId: parseInt(id, 10), comment, username }]);
                setComment('');
            } catch (error) {
                console.log('Error adding comment', error);
            }
        }
    };

    const handleAddToFavorites = async () => {
        if (!id) {
            console.error("Game ID is undefined");
            return;
        }

        if (userId && game) {
            try {
                await axios.post(`http://localhost:3000/api/users/${userId}/favoritesgames`, { gameId: game.id });
                alert('Game added to favorites');
                setIsFavorite(true);
            } catch (error) {
                console.error('Error adding to favorites', error);
            }
        }
    };

    const handleRemoveFromFavorites = async () => {
        if (!id) {
            console.error("Game ID is undefined");
            return;
        }

        if (userId && game) {
            try {
                await axios.delete(`http://localhost:3000/api/users/${userId}/favoritesgames/${game.id}`);
                alert('Game removed from favorites');
                setIsFavorite(false);
            } catch (error) {
                console.error('Error removing from favorites', error);
            }
        }
    };

    if (!game) {
        return <div>Loading...</div>;
    }
    return (
        <div className="game-details-design">
            <div className="game-details-container">
                <div className="image-name-game-container">
                    <h1>{game.title}</h1>
                    <img src={game.image} alt={game.title} />
                </div>
                <div className="info-game-container">
                    {!commentsView ? (
                        <>
                            {isFavorite ? (
                                <button onClick={handleRemoveFromFavorites}>❌</button>
                            ) : (
                                <button onClick={handleAddToFavorites}>⭐</button>
                            )}
                            <p><b>Release year: </b>{game.releaseYear}</p><br />
                            <p>{game.desc}</p>
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
                                        <span className="comment"><li key={index}><span className="username">{c.username}</span>: {c.comment}</li></span>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {commentsView ? (
                <>
                    <button className="change-view-button" onClick={toCommentsClick}>▲ TO INFORMATION ▲</button>
                </>
            ) : (
                <>
                    <button className="change-view-button" onClick={toCommentsClick}>▲ TO COMMENTS ▲</button>
                </>
            )}
        </div>
    );
}

export default GameDetails;
