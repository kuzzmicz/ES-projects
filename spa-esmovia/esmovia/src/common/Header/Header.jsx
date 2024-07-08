import Surfer from "../Surfer/Surfer";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { myContext } from "../../app/context";
import { jwtDecode } from "jwt-decode";
import esmovia from "../../assets/esmovia.jpg";
import CInput from "../Cinput/Cinput";

function Header() {

  const { state, SetAuth } = useContext(myContext);
  const [decodedName, setDecodedName] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if(state.global.token !== ""){
      
      let decoded = jwtDecode(state.global.token)

      setDecodedName(decoded?.firstName)

    }
  }, [state]);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setSearch(e.target.value)
  }

  useEffect(()=> {

    SetAuth("search", search)
  }, [search])
  return (
    <div className="header-design">

      <CInput 
        type="text"
        name="search"
        placeholder=""
        design="basic-input"
        emitFunction={inputHandler}
        errorCheck={()=>{}}
      />
      
      <div onClick={() => navigate("/")}>
        <img className="logo-design" src={esmovia} alt="idk" />
      </div>

      <Surfer path={"/"} destiny={"Home"} />

      {state.global.token === "" ? (
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