import React, { useEffect, useState } from 'react';
import demo from './movied';
import { Button, Badge } from 'react-bootstrap';
import NumberSelector from './NumberSelect';

const currentUser = localStorage.getItem("currentUser") || "guest_user";
const PlayingTex = () => {
  const [showSelector, setShowSelector] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const allSelectedNumbers = JSON.parse(localStorage.getItem("selectedNumbers")) || {};
  const allConfirmedTickets = JSON.parse(localStorage.getItem("confirmedTickets")) || {};
  const allDisabledNumbers = JSON.parse(localStorage.getItem("disabledNumbers")) || {};

  const [selectedNumbers, setSelectedNumbers] = useState(() => allSelectedNumbers[currentUser] || {});
  const [confirmedTickets, setConfirmedTickets] = useState(() => allConfirmedTickets[currentUser] || {});
  const [disabledNumbers, setDisabledNumbers] = useState(() => allDisabledNumbers || {});

  const handleAddTicket = (movie) => {
    setCurrentMovie(movie);
    setShowSelector(true);
  };
  const handleNumberSelect = (numbers) => {
    if (currentMovie) {
      const movieId = currentMovie.id;

      const updatedSelected = {
        ...selectedNumbers,
        [movieId]: numbers,
      }
      const updatedDisabled = {
        ...disabledNumbers,
        [movieId]: [...(disabledNumbers[movieId] || []), ...numbers]

      };
      const updatedConfirmed = {
        ...confirmedTickets,
        [movieId]: numbers,
      };
      // Update States
      setSelectedNumbers(updatedSelected);
      setConfirmedTickets(updatedConfirmed);
      setDisabledNumbers(updatedDisabled);

      const newAllSelected = {
        ...allSelectedNumbers,
        [currentUser]: updatedSelected
      };
      const newAllConfirmed = {
        ...allConfirmedTickets,
        [currentUser]: updatedConfirmed
      };
      localStorage.setItem("selectedNumbers", JSON.stringify(newAllSelected));
      localStorage.setItem("disabledNumbers", JSON.stringify(updatedDisabled));
      localStorage.setItem("confirmedTickets", JSON.stringify(newAllConfirmed));
      setShowSelector(false);
      alert(`Tickets confirmed for ${currentMovie.name || 'the movie'}: ${numbers.join(", ")}`);
    }
  };
  const computeDisabledNumbers = (allDisabled, allSelected, user) => {
  const filtered = {};
  for (const movieId in allDisabled) {
    const allDisabledForMovie = allDisabled[movieId] || [];
    const currentUserSelected = (allSelected[user] || {})[movieId] || [];
    filtered[movieId] = allDisabledForMovie.filter(
      (num) => !currentUserSelected.includes(num)
    );
  }
  return filtered;
};
useEffect(()=> {
  const filtered = computeDisabledNumbers(allDisabledNumbers, allSelectedNumbers, currentUser);
  setDisabledNumbers(filtered);
},[selectedNumbers, currentUser])
  const handleShowTicket = (movieId) => {
    const numbers = selectedNumbers[movieId];
    if (numbers?.length > 0) {
      alert(`Your selected ticket numbers for ${demo.find(m => m.id === movieId).title} are: ${numbers.sort((a, b) => a - b).join(', ')}`);
    } else {
      alert('Please select ticket numbers first by clicking "Add Tickets"');
    }
  };
 const handelDeleteTicket = (movieId, numberToDelete) => {

  // Convert to array if it's not already
  const numbersToRemove = Array.isArray(numberToDelete) 
    ? numberToDelete 
    : [numberToDelete];

  console.log(numbersToRemove);
  
  const userSelected = selectedNumbers[movieId] || [];
  const newSelected = userSelected.filter(num => !numbersToRemove.includes(num));
  
  const updatedSelected = { ...selectedNumbers, [movieId]: newSelected };
  const updatedConfirmed = { ...confirmedTickets };

  // Remove movie entry if no selections left
  if (newSelected.length === 0) {
    delete updatedSelected[movieId];
    delete updatedConfirmed[movieId];
  }

  // Update disabled numbers
  const globalDisabled = JSON.parse(localStorage.getItem("disabledNumbers")) || {};
  const updatedGlobalDisabled = {
    ...globalDisabled,
    [movieId]: (globalDisabled[movieId] || []).filter(
      num => !numbersToRemove.includes(num)
    ),
  };

  // Update state
  setSelectedNumbers(updatedSelected);
  setConfirmedTickets(updatedConfirmed);
  setDisabledNumbers(updatedGlobalDisabled);

  // Update localStorage for current user
  const newAllSelected = {
    ...allSelectedNumbers,
    [currentUser]: updatedSelected,
  };
  const newAllConfirmed = {
    ...allConfirmedTickets,
    [currentUser]: updatedConfirmed,
  };

  localStorage.setItem("selectedNumbers", JSON.stringify(newAllSelected));
  localStorage.setItem("confirmedTickets", JSON.stringify(newAllConfirmed));
  localStorage.setItem("disabledNumbers", JSON.stringify(updatedGlobalDisabled));
};

  const getAvailableNumbers = () => {
    return Array.from({ length: 60 }, (_, i) => i + 1);
  };
  return (
    <div >
      <h2 style=
        {{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: "2.5rem",
          background: "linear-gradient(270deg, #ff6ec4, #7873f5, #4ade80, #facc15)",
          backgroundSize: "800% 800%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientMove 5s ease infinite",
        }}>The  New Movie List</h2>
      <div className='movie-master'>
        {demo.map((movie) => {
          const movieNumbers = selectedNumbers[movie.id] || [];
          return (
            <div key={movie.id} className="movie-card">
              <img className='movidim' src={movie.image} alt={movie.title} />
              <h3 style={{ fontSize: "20px" }}>{movie.title}</h3>
              <p>{movie.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                <Button
                  variant={movieNumbers.length > 0 ? "success" : "primary"}
                  onClick={() => handleAddTicket(movie)}
                  className="position-relative"
                  style={{ minWidth: '120px' }}
                >
                  {movieNumbers.length > 0 ? (
                    <>
                      Tickets: {movieNumbers.sort((a, b) => a - b).join(', ')}
                      <Badge bg="light" text="dark" className="ms-1">
                        {movieNumbers.length}
                      </Badge>
                    </>
                  ) : (
                    'Add Tickets'
                  )}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleShowTicket(movie.id)}
                  disabled={movieNumbers.length === 0}
                >
                  Show Tickets
                </Button>
              </div>
            </div>
          );
        })}
        <NumberSelector
          show={showSelector}
          onHide={() => setShowSelector(false)}
          onSelect={handleNumberSelect}
          onDeleteTicket={handelDeleteTicket}
          selectedNumbers={currentMovie ? selectedNumbers[currentMovie.id] || [] : []}
          availableNumbers={getAvailableNumbers()}
          disabledNumbers={currentMovie ? disabledNumbers[currentMovie.id] || [] : []}
          movieId={currentMovie?.id}
        />
      </div>
    </div>
  );
};
export default PlayingTex;