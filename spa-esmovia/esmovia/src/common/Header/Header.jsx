import Surfer from "../Surfer/Surfer";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import esmovia from "../../assets/esmovia.jpg"

function Header() {

  const navigate = useNavigate()
  return (
    <div className="header-design">
      <div onClick={()=>navigate("/")}><img className="logo-design" src={esmovia} alt="idk" /></div>
      
      <Surfer path={"/"} destiny={"Home"} />
      <Surfer path={"/login"} destiny={"Login"} />
      <Surfer path={"/profile"} destiny={"Profile"} />
      <Surfer path={"/register"} destiny={"Register"} />
    </div>
  );
}

export default Header;