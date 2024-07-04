import { useState, useEffect } from "react";
import CInput from "../../common/Cinput/Cinput";
import "./Login.css";
import checkE from "../../utils/errors";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [credentialsErrors, setCredentialsErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const inputHandler = (e) => {
    //Binding process
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      //email : maciej@gmail.com
    }));
  };

  const errorCheck = (e) => {
    let error = "";

    error = checkE(e.target.name, e.target.value);

    setCredentialsErrors((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // useEffect(()=>{

  //     console.log(credentials)

  // }, [credentials])

  return (
    <div className="login-design">
      <CInput
        type="email"
        name="email"
        placeholder=""
        design={`${credentialsErrors.emailError !== "" ? "error-input" : ""} basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.emailError}
      <CInput
        type="password"
        name="password"
        placeholder=""
        design={`${credentialsErrors.passwordError !== "" ? "error-input" : ""} basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.passwordError}
    </div>
  );
}

export default Login;