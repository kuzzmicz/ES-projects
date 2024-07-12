import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Characters from "../Characters/Characters";
import Games from "../Games/Games";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CharacterDetails from "../CharacterDetails/CharacterDetails";
import Profile from "../Profile/Profile"; 
import GameDetails from "../GameDetails/GameDetails";

function Body() {
    return (
        <div className="body-container">
            <Routes>
                <Route path="*" element={<Navigate to={"/"} replace />} />
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/characters/:id" element={<CharacterDetails />} />
                <Route path="/games/:id" element={<GameDetails/>} />
                <Route path="/games" element={<Games />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} /> 
            </Routes>
        </div>
    );
}

export default Body;
