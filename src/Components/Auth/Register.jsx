import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { hstyle, ipstyle, styles } from './style';

const Register = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async() => {
    // Simulating user registration
    try {
      const response = await fetch("http://localhost:5174/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else if(response.status==400){
        alert("User already exists!");
      }else{
        alert("Registration Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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