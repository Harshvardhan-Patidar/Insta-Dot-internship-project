import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { hstyle, ipstyle, styles } from './style';

const Register = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Simulating user registration
    localStorage.setItem("token", "dummy-jwt-token");
    navigate("/dashboard");
  };

  const handleSubmit=(formData)=>{
    const data=Object.fromEntries(formData.entries);
    console.log(data);
  }

  return (
    <div>
      <h1 style={hstyle}>Register Page</h1>
      <form action={handleSubmit} style={styles}>
      <input style={ipstyle} type="text" placeholder="Harsh" value={user} onChange={(e) => setUser(e.target.value)}/>
      <input style={ipstyle} type="email" placeholder="***@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input style={ipstyle} type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <button style={{cursor:"pointer"}} onClick={email && handleRegister}>Register</button>
      </form>
    </div>
  )
}

export default Register