import Surfer from "../Surfer/Surfer";
import "./Header.css";

function Header(){
    return (
   <div className="header-design">
    <Surfer path={"/"} destiny={"Home"}/>
    <Surfer path={"/login"} destiny={"Login"}/>
    <Surfer path={"/profile"} destiny={"Profile"}/>
    <Surfer path={"/register"} destiny={"Register"}/>
   </div>
    )
}
export default Header;