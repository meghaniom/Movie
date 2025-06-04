import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-400">
      <motion.div
        initial={{ y: -30 }}
        animate={{ y: [-30, 0, 30, 0] }} // bounce-like effect
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/20 shadow-lg border border-white/30"
      >
        <h2 className="text-center text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 animate-pulse">
          Sign Up
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white  text-lg  font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              ref={nameRef}
              required
              placeholder="Enter name"
              className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-400 outline-none shadow-inner"
            />
          </div>
          <div>
            <label className="block text-white  text-lg  font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              required
              placeholder="Enter email"
              className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-pink-400 outline-none shadow-inner"
            />
          </div>
          <label className="block text-white  text-lg font-medium mb-1">
            Password
          </label>
          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={8}
              maxLength={16}
              className="w-full p-3 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-purple-400 outline-none shadow-inner"
              placeholder="Enter password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer
                hover:text-gray-700
              flex items-center h-full"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {password && (
            <div className="text-sm text-whi   te space-y-1">
              <p
                className={
                  validations.hasUpperCase ? "text-green-300" : "text-gray-300"
                }
              >
                {validations.hasUpperCase ? "✓" : "•"} At least one uppercase
                letter
              </p>
              <p
                className={
                  validations.hasLowerCase ? "text-green-300" : "text-gray-300"
                }
              >
                {validations.hasLowerCase ? "✓" : "•"} At least one lowercase
                letter
              </p>
              <p
                className={
                  validations.hasNumber ? "text-green-300" : "text-gray-300"
                }
              >
                {validations.hasNumber ? "✓" : "•"} At least one number
              </p>
              <p
                className={
                  validations.hasSpecialChar
                    ? "text-green-300"
                    : "text-gray-300"
                }
              >
                {validations.hasSpecialChar ? "✓" : "•"} At least one special
                character
              </p>
              <p
                className={
                  validations.hasMinLength ? "text-green-300" : "text-gray-300"
                }
              >
                {validations.hasMinLength ? "✓" : "•"} Minimum 8 characters
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 mb-0 text-white/90">
          Already have an account?{" "}
          <a
            href="/login"
            className="underline text-yellow-700 hover:text-white pl-1.5"
          >
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
