import "./Header.css";
import Surfer from "../Surfer/Surfer";
import { useNavigate } from "react-router-dom";
function Header(){
    const navigate = useNavigate();
return(
    
    <div className="header-design">
        <Surfer path={"/login"} destiny={"Login"}/>
        <Surfer path={"/register"} destiny={"Register"}/>
          <div onClick={()=>navigate("/")}><img src="logo.png" alt="umbrella logo"/></div>
        <Surfer destiny={"Home"} path={"/"} />
        <Surfer path={"/characters"} destiny={"Characters"}/>
        <Surfer path={"/games"} destiny={"Games"}/>
     </div>
)
}
export default Header;