import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Home from "../Home/Home";
function Body(){
return (
    <div className="body-container">
    	<BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
)
}

export default Body;