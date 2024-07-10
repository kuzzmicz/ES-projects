import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Home from "../Home/Home";
import Characters from "../Characters/Characters";
import Games from "../Games/Games";
function Body(){
return (
    <div className="body-container">
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/characters" element={<Characters/>}/>
        <Route path="/games" element={<Games/>}/>
      </Routes>
    </div>
)
}

export default Body;