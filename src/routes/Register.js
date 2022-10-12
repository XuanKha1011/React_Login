import { useState } from "react";
import React from "react";
import "./Register.css";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    console.log(email,firstName);
  };

  return (
    <div className="auth-form-container" onSubmit={handleSubmitRegister}>
      <h2>Register</h2>
      <form className="login-form" >
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="username">Name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
    
    <div className="btn"> 
    <button className="register-btn" type="submit" >Submit</button>
    </div>  
    </form>
    </div>
  );
}

export default Register;
