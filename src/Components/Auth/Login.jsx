import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { hstyle, ipstyle, styles } from './style';
// import { get } from 'mongoose';


const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    try {
      const response = await fetch("http://localhost:5173/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // const data1=get("http://localhost:5000/login");

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } 
      else if(response.status==400){
        alert("User not found");
        const timeout=setTimeout(() => {
          navigate("/register");
        }, 2000);
      }
      else {
        alert("Login Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleForm=(formData)=>{
    const data=Object.fromEntries(formData.entries());
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