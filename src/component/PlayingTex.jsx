import React, { useEffect, useState } from 'react';

import { Button, Badge } from 'react-bootstrap';
import NumberSelector from './NumberSelect';
import ShowTicket from './ShowTicket';
import { Demo } from './movied';


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

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const [resetTicket, setResetTicket] = useState(false);
  const [modalShow, setModalShow] = useState(false);



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
  useEffect(() => {
    const filtered = computeDisabledNumbers(allDisabledNumbers, allSelectedNumbers, currentUser);
    setDisabledNumbers(filtered);
  }, [selectedNumbers, currentUser])


  const handleShowTicket = (movieId) => {

    const numbers = selectedNumbers[movieId];
    if (numbers?.length > 0) {

      setSelectedMovieId(movieId);
      setModalShow(true);
    } else {
      alert("No tickets selected for this movie.");
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


//    const handleReset = (movieId, numbersToReset) => {
//   if (!movieId || !numbersToReset || numbersToReset.length === 0) return;

//   // Update disabled numbers by removing these numbers
//   const updatedDisabled = {
//     ...disabledNumbers,
//     [movieId]: (disabledNumbers[movieId] || []).filter(
//       num => !numbersToReset.includes(num)
//   )};

//   // Update selected numbers by removing these numbers
//   const updatedSelected = {
//     ...selectedNumbers,
//     [movieId]: (selectedNumbers[movieId] || []).filter(
//       num => !numbersToReset.includes(num))
//   };

//   // Update state
//   setDisabledNumbers(updatedDisabled);
//   setSelectedNumbers(updatedSelected);

//   // Update localStorage
//   const newAllDisabled = {
//     ...JSON.parse(localStorage.getItem("disabledNumbers") || "{}"),
//     [movieId]: updatedDisabled[movieId]
//   };
  
//   const newAllSelected = {
//     ...JSON.parse(localStorage.getItem("selectedNumbers") || "{}"),
//     [currentUser]: updatedSelected
//   };

//   localStorage.setItem("disabledNumbers", JSON.stringify(newAllDisabled));
//   localStorage.setItem("selectedNumbers", JSON.stringify(newAllSelected));

//   alert(`${numbersToReset.length} tickets have been reset and are now available!`);
// };

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
          marginTop: "10px"
        }}>The  New Movie List</h2>
      <div className='movie-master'>
        {Demo.map((movie) => {
          const movieNumbers = selectedNumbers[movie.id] || [];
          return (
            <div key={movie.id} className="movie-card">
              <img className='movidim' src={movie.image} alt={movie.title} />
              <h3 style={{ fontSize: "20px" }}>{movie.title}</h3>
              <p>{movie.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                <Button
                  variant="primary"
                  onClick={() => handleAddTicket(movie)}
                  className="position-relative"
                  style={{
                    minWidth: '120px',
                    // width: '100px'
                  }}
                >Add Tickets    
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
          // onReset = {handleReset}
          selectedNumbers={currentMovie ? selectedNumbers[currentMovie.id] || [] : []}
          availableNumbers={getAvailableNumbers()}
          disabledNumbers={currentMovie ? disabledNumbers[currentMovie.id] || [] : []}
          movieId={currentMovie?.id}
        />
        <ShowTicket
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie={Demo.find(m => m.id === selectedMovieId)}
          numbers={selectedNumbers[selectedMovieId]}
        />
      </div>
    </div>
  );
};
export default PlayingTex;