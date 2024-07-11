import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import "./Login.css";

function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const navigate = useNavigate();
    const { setUsername } = useUser();

    const handleLogin = () => {
        localStorage.setItem('username', usernameInput);
        setUsername(usernameInput);
        navigate('/');
    };

    return (
        <div className="login-design">
            <h2>Login</h2>
            <input 
                type="text" 
                value={usernameInput} 
                onChange={(e) => setUsernameInput(e.target.value)} 
                placeholder="Enter username" 
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;