import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import "./Login.css";
import axios from 'axios';

function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const navigate = useNavigate();
    const { setUsername } = useUser();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Login attempt:", usernameInput, passwordInput);

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username: usernameInput,
                password: passwordInput
            });
            
            console.log("Login response:", response.data);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('username', usernameInput);
            setUsername(usernameInput);
            navigate('/');
        } catch (error) {
            console.error('Error logging in', (error as Error).message);
        }
    };

    return (
        <div className="login-design">
            <h1>LOGIN</h1><br/>
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
        </div>
    );
}

export default Login;
