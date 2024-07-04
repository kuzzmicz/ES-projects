
import { useState, useEffect } from "react";
import CInput from "../../common/Cinput/Cinput";
import "./Login.css";

function Login () {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(()=>{

        console.log(credentials)

    }, [credentials])

    return (
        <div className="login-design">
            <CInput 
                type="email"
                name="email"
                placeholder=""
                design="basic-input"
                emitFunction={inputHandler}
            />
            <CInput 
                type="password"
                name="password"
                placeholder=""
                design="basic-input"
                emitFunction={inputHandler}
            />
        </div>
    )
}

export default Login;