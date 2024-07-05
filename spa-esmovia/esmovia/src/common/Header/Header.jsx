import Surfer from "../Surfer/Surfer";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { myContext } from "../../app/context";
import { jwtDecode } from "jwt-decode";
import esmovia from "../../assets/esmovia.jpg";

function Header() {

  const { state, SetAuth } = useContext(myContext);
  const [decodedName, setDecodedName] = useState("")

  useEffect(() => {
    
    if(state.auth.token !== ""){
     
      let decoded = jwtDecode(state.auth.token)

      setDecodedName(decoded?.firstName)

    }
  }, [state]);

  const navigate = useNavigate();
  return (
    <div className="header-design">
      <div onClick={() => navigate("/")}>
        <img className="logo-design" src={esmovia} alt="idk" />
      </div>

      <Surfer path={"/"} destiny={"Home"} />

      {state.auth.token === "" ? (
        <div>
          <Surfer path={"/login"} destiny={"Login"} />
          <Surfer path={"/register"} destiny={"Register"} />
        </div>
      ) : (
        <div>
          <Surfer path={"/profile"} destiny={decodedName} />
          <div onClick={()=>SetAuth("token", "")}>
            <Surfer path={"/"} destiny={"log out"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;