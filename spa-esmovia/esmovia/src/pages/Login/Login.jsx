import { useContext, useState, useEffect } from "react";
import { myContext } from "../../app/context";
import CInput from "../../common/CInput/CInput";
import "./Login.css";
import checkE from "../../utils/errors";
import { LoginMe } from "../../services/api-calls";

function Login() {


  const {state, SetAuth} = useContext(myContext)

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const [credentialsErrors, setCredentialsErrors] = useState({
    nameError: "",
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

  const loginFunction = async () => {

    LoginMe(credentials)
        .then(res => {
          SetAuth("token", res.token)
        })
        .catch(error => console.log(error))
  };


  return (
    <div className="login-design">
      <CInput
        type="text"
        name="name"
        placeholder=""
        design={`${
          credentialsErrors.nameError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.nameError}
      <CInput
        type="password"
        name="password"
        placeholder=""
        design={`${
          credentialsErrors.passwordError !== "" ? "error-input" : ""
        } basic-input`}
        emitFunction={inputHandler}
        errorCheck={errorCheck}
      />
      {credentialsErrors.passwordError}
      {credentials.name !== "" &&
        credentials.password !== "" &&
        credentialsErrors.nameError === "" &&
        credentialsErrors.passwordError === "" && (
          <div className="login-button-design" onClick={loginFunction}>
            Login me!
          </div>
        )}
    </div>
  );
}

export default Login;