import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import "./Login.css";
import axios from 'axios';

function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setUsername, setUserId } = useUser();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!usernameInput || !passwordInput) {
            setErrorMessage('Both fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username: usernameInput,
                password: passwordInput
            });
            
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('username', usernameInput);
            setUsername(usernameInput);
            setUserId(response.data.userId);
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || 'Error logging in');
            } else {
                setErrorMessage('Error logging in');
            }
        }
    };

    return (
        <div className="login-design">
          <div className="login-container">
            <h1>LOGIN</h1><br/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input 
                type="text" 
                value={usernameInput} 
                onChange={(e) => setUsernameInput(e.target.value)} 
                placeholder="Enter username" 
                required
            /><br/><br/>
            <input 
                type="password"
                placeholder="Enter password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                required
            /><br/><br/>
            <button onClick={handleLogin}>Login</button>
        </div></div>
    );
}

export default Login;
