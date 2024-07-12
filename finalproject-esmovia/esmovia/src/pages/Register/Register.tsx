import "./Register.css";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/register', { username, password });
      navigate('/login');
    } catch (error) {
      console.error('Error registering', error);
    }
  };

  return (
    <div className="register-design">
      <h1>REGISTER</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
