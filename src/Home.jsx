import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/movie');
  };

  if (!currentUser) {
    navigate('/movie');
    return null;
  }

  return (
    <div className="home-container">
      {/* <h1>Welcome, {currentUser.name}!</h1>
      <p>Email: {currentUser.email}</p> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;