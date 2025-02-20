import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { hstyle, ipstyle, styles } from './style';


const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulating authentication
    localStorage.setItem("token", "dummy-token");
    navigate("/dashboard");
  };

  const handleForm=(formData)=>{
    const data=Object.formEntries(formData.entries);
    console.log(data);
  }

  return (
    <div>
      <h1 style={hstyle}>Login Page</h1>
        <form action={handleForm} style={styles}>
      <input style={ipstyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input style={ipstyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <button style={{cursor:"pointer"}} onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}

export default Login