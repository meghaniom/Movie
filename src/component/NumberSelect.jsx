import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

const NumberSelector = ({
  show,
  onHide,
  onSelect,
  onDeleteTicket,
  selectedNumbers = [],
  disabledNumbers = [],
  movieId
}) => {
  const [tempSelected, setTempSelected] = useState(selectedNumbers);
  const [selectedSeatsToDelete, setSelectedSeatsToDelete] = useState([]);

  useEffect(() => {
    if (show) {
      setTempSelected(selectedNumbers);
    }
    
  }, [show, selectedNumbers, movieId]);

  const handleNumberClick = (number) => {
    tempSelected?.includes(number)&&setSelectedSeatsToDelete([...selectedSeatsToDelete, number]);
    // Prevent selection of disabled numbers
    if (disabledNumbers.includes(number)) return;

    // Toggle selection
    setTempSelected(prev =>
      prev.includes(number)
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  const handleConfirm = () => {
    onSelect(tempSelected);
    onHide();
  };
  const handelDelete = () => {
    console.log(selectedSeatsToDelete,"selectedSeatsToDelete");
    console.log(tempSelected,"tempSelected");
    
    if (selectedSeatsToDelete.length > 0) {
      onDeleteTicket(movieId, selectedSeatsToDelete);
      onHide();
    } else {
      alert("Please select at least one seat to delete.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Select Numbers for Movie {movieId}
          {tempSelected.length > 0 && (
            <Badge bg="primary" className="ms-2">
              {tempSelected.length} selected
            </Badge>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: '8px',
          padding: '10px'
        }}>
          {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => {
            const isDisabled = disabledNumbers.includes(number);
            const isSelected = tempSelected.includes(number);
            return (
              <div
                key={number}
                onClick={() => handleNumberClick(number)}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${isSelected ? '#007bff' : '#ddd'}`,
                  backgroundColor: isDisabled
                    ? '#e9ecef'
                    : isSelected
                      ? '#007bff'
                      : '#f8f9fa',
                  color: isDisabled
                    ? '#adb5bd'
                    : isSelected
                      ? 'white'
                      : 'black',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                {number}
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
     <Button variant="danger" onClick={handelDelete}
          style={{
          backgroundColor: selectedSeatsToDelete.length > 0 ? '#dc3545' : '#f8f9fa',
    color: selectedSeatsToDelete.length > 0 ? 'white' : 'gray',
    border: '1px solid gray',
    cursor: selectedSeatsToDelete.length > 0 ? 'pointer' : 'not-allowed'
          }}>
          Delete
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default NumberSelector;
