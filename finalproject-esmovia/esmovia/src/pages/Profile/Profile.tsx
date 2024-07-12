import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./Profle.css";
function Profile() {
    const navigate = useNavigate();
    const { username } = useUser();

    if (!username) {
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-design">
            <h1>Profile</h1><br/>
            <div className="profile-container">
            <div className="user-container"><h1>{username}</h1>
            <img src="avatar.png"/>
            </div>
            <div className="user-info">
                <h2>Favorite pages: </h2>
            </div>
        </div></div>
    );
}

export default Profile;