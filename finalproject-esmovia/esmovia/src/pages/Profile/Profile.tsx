import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import axios from "axios";
import { Character } from "../../interfaces";
import { useEffect, useState } from "react";
import "./Profle.css";
function Profile() {
    const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);

    const navigate = useNavigate();
    const { username } = useUser();
    const { id } = useUser();
    if (!username) {
        navigate('/login');
        return null;
    }
    useEffect(() => {
        const fetchData = async () => {
            console.log(username);
            try {
                const favoritesResponse = await axios.get(`http://localhost:3000/api/users/${id}/favorites`); 
                setFavoriteCharacters(favoritesResponse.data);
            }
            catch(error){
                console.log('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="profile-design">
            <h1>Profile</h1><br/>
            <div className="profile-container">
            <div className="user-container"><h1>{username}</h1>
            <img src="avatar.png"/>
            </div>
            <div className="user-info">
                <h2>Favorite pages: </h2>
                {favoriteCharacters.map(favorite=>(
                    <div key={favorite.id}>{favorite.name}</div>
                ))}
            </div>
        </div></div>
    );
}

export default Profile;