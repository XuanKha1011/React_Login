import { useState } from "react";
import React from "react";
import "./Register.css";

function Register(props) {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="login-form" onSubmit={handleSubmitRegister}>
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button className="register-btn" type="submit">Submit</button>
      </form>
     
    </div>
  );
}

export default Register;
