import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

function Profile() {
    const navigate = useNavigate();
    const { username } = useUser();

    if (!username) {
        navigate('/login');
        return null;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome, {username}!</p>
        </div>
    );
}

export default Profile;