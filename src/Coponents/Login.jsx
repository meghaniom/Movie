import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth.css'

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <button type="submit" className='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <a href="/">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;