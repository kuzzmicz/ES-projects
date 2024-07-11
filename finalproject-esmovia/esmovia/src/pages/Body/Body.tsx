import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Home from "../Home/Home";
import Characters from "../Characters/Characters";
import Games from "../Games/Games";
import Login from "../Login/Login";
import Register from "../Register/Register";
function Body(){
return (
    <div className="body-container">
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/characters" element={<Characters/>}/>
        <Route path="/games" element={<Games/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
)
}

export default Body;