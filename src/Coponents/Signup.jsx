import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../auth.css";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    // Validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setError("Email already registered");
      return;
    }

    // Save new user
    const newUser = { name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    navigate("/login");
  };
  const [password, setPassword] = useState("");
  const [showValidations, setShowValidations] = useState(false);

  const validations = {
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasMinLength: password.length >= 8,
  };

  const isPasswordValid = Object.values(validations).every(Boolean);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Show validations only if password exists and isn't fully valid yet
    setShowValidations(value.length > 0 && !isPasswordValid);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="main-container"
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <div
        className="auth-container"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "400px",
        }}
      >
        <div className="signup-container">
          <div className="flex flex-col  justify-center  p-8 bg-gray-50">
            <h2 className="text-center text-4xl font-bold mb-8 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-500 to-pink-600 bg-[length:200%_auto] animate-pulse">
              Sign Up
            </h2>
            <style jsx>{`
              .animate-gradient {
                animation: gradient 3s ease infinite,
                  pulse 2s ease-in-out infinite;
              }
              @keyframes gradient {
                0% {
                  background-position: 0% 50%;
                  color: #ff6ec4;
                }
                50% {
                  background-position: 100% 50%;
                  color: #7873f5;
                }
                100% {
                  background-position: 0% 50%;
                  color: #4ade80;
                }
              }
              @keyframes pulse {
                0%,
                100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}</style>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  ref={nameRef}
                  required
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full mb-3 relative">
                <label className="mb-2 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    minLength={8}
                    maxLength={16        }
                    className="w-full pr-10 h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="
                     absolute right-3 top-1/2 -translate-y-1/2
                     cursor-pointer text-gray-500 hover:text-gray-700
                     flex items-center h-full
                   "
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {password && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p
                      className={
                        validations.hasUpperCase
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {validations.hasUpperCase ? "✓" : "•"} At least one
                      uppercase letter
                    </p>
                    <p
                      className={
                        validations.hasLowerCase
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {validations.hasLowerCase ? "✓" : "•"} At least one
                      lowercase letter
                    </p>
                    <p
                      className={
                        validations.hasNumber
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {validations.hasNumber ? "✓" : "•"} At least one number
                    </p>
                    <p
                      className={
                        validations.hasSpecialChar
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {validations.hasSpecialChar ? "✓" : "•"} At least one
                      special character
                    </p>
                    <p
                      className={
                        validations.hasMinLength
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    >
                      {validations.hasMinLength ? "✓" : "•"} Minimum 8
                      characters
                    </p>
                  </div>
                )}
              </div>
              <button type="submit" className="submit">
                Sign Up
              </button>
            </form>
            <p className="text-center mt-4">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
