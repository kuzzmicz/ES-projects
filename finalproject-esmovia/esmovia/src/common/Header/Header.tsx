import "./Header.css";
import Surfer from "../Surfer/Surfer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

function Header() {
    const navigate = useNavigate();
    const { username, setUsername } = useUser();

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
        navigate('/');
    };

    return (
        <div className="header-design">
            {username ? (
                <>
                    <div className="surfer-design" onClick={() => navigate('/profile')}>
                        Welcome, {username}!
                    </div>
                    <div className="surfer-design" onClick={handleLogout}>
                        Logout
                    </div>
                </>
            ) : (
                <>
                    <Surfer path="/login" destiny="Login" />
                    <Surfer path="/register" destiny="Register" />
                </>
            )}
            <div onClick={() => navigate("/")}><img src="logo.png" alt="umbrella logo" /></div>
            <Surfer destiny="Home" path="/" />
            <Surfer path="/characters" destiny="Characters" />
            <Surfer path="/games" destiny="Games" />
        </div>
    );
}

export default Header;