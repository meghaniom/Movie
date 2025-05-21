import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../auth.css';

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    // Validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      setError('Email already registered');
      return;
    }

    // Save new user
    const newUser = { name, email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate('/login');
  };

  return (
    <div className='main-container' style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div className="auth-container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: "400px" }}>
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" ref={nameRef} required />
          </div>
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
          <button type="submit" className='submit'>Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
