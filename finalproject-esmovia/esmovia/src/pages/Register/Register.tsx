import "./Register.css";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/register', { username, password });
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Error registering');
      } else {
        setErrorMessage('Error registering');
      }
    }
  };

  return (
    <div className="register-design">
      <div className="register-container">
        <h1>REGISTER</h1><br/>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br/><br/>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/><br/>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
