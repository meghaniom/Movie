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
        <div className='flex flex-col  justify-center  p-8 bg-gray-50'>
          <h2 className='text-center text-4xl font-bold mb-8 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-500 to-pink-600 bg-[length:200%_auto] animate-pulse'>Login</h2>

          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className='mb-2 block'>Email</label>
              <input type="email" ref={emailRef} required />
            </div>
            <div className="w-full mb-3 relative">  
              <label className='mb-2 block'>Password</label>
              <div className="relative">  
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  required
                  minLength={6}
                  className="w-full pr-10 h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="
        absolute right-3 top-1/2 -translate-y-1/2
        cursor-pointer text-gray-500 hover:text-gray-700
        flex items-center h-full
      "  >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit" className='submit'>Login</button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? <a href="/">Sign Up</a>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Login;