import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../auth.css'

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    // Get all users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    if (!user) {
      setError('User not found');
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }

    // Set current user and redirect
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate("/movie");
  };

  return (
    <div className='main-container' style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div className="auth-container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: "400px" }}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div className="form-group" style={{ position: "relative" }}>
                   <label>Password</label>
                   <input
                     type={showPassword ? "text" : "password"}
                     ref={passwordRef}
                     required
                     minLength={6}
                     style={{ paddingRight: "40px", width: "100%" }}
                   />
                   <span
                     onClick={togglePasswordVisibility}
                     style={{
                       position: "absolute",
                       right: "10px",
                       top: "38px",
                       cursor: "pointer",
                       color: "#888"
                     }}
                   >
                     {showPassword ? <FaEyeSlash /> : <FaEye />}
                   </span>
                 </div>
        <button type="submit" className='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <a href="/">Sign Up</a>
      </p>
    </div>
    </div>
    
  );
};

export default Login;