import React, { useState, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import "../index.css";
const NumberSelector = ({
  show,
  onHide,
  onSelect,
  onDeleteTicket,
  selectedNumbers = [],
  disabledNumbers = [],
  movieId,
}) => {
  const [tempSelected, setTempSelected] = useState(selectedNumbers);
  const [selectedSeatsToDelete, setSelectedSeatsToDelete] = useState([]);
  useEffect(() => {
    if (show) {
      setTempSelected(selectedNumbers);
    }
  }, [show, selectedNumbers, movieId]);

  const handleNumberClick = (number) => {
    tempSelected?.includes(number) &&
      setSelectedSeatsToDelete([...selectedSeatsToDelete, number]);
    // Prevent selection of disabled numbers
    if (disabledNumbers.includes(number)) return;

    // Toggle selection
    setTempSelected((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const handleConfirm = () => {
    onSelect(tempSelected);
    onHide();
  };
  const handelDelete = () => {
    console.log(selectedSeatsToDelete, "selectedSeatsToDelete");
    console.log(tempSelected, "tempSelected");

    if (selectedSeatsToDelete.length > 0) {
      onDeleteTicket(movieId, selectedSeatsToDelete);
      onHide();
    } else {
      alert("Please select at least one seat to delete.");
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="lg"
        contentClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            🎬 Select Seats for Movie{" "}
            <span className="ms-2 text-primary">#{movieId}</span>
            {tempSelected.length > 0 && (
              <Badge bg="primary" className="ms-3">
                {tempSelected.length} selected
              </Badge>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div style={{ display: "flex", gap: "12px", justifyContent:"center", alignItems: "center"}}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
              ></div>
              <span>Available</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "linear-gradient(135deg, #0d6efd, #66b2ff)",
                  border: "1px solid #0056b3",
                  borderRadius: "4px",
                }}
              ></div>
              <span>Selected</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#adb5bd",
                  border: "1px solid #6c757d",
                  borderRadius: "4px",
                }}
              ></div>
              <span>Booked</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "10px",
              padding: "20px",
              // justifyItems: "center",
            }}
          >
            {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => {
              const isDisabled = disabledNumbers.includes(number);
              const isSelected = tempSelected.includes(number);

              return (
                <div
                  key={number}
                  onClick={() => !isDisabled && handleNumberClick(number)}
                  title={`Seat ${number}`}
                  style={{
                    width: "45px",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    background: isDisabled
                      ? "#dee2e6"
                      : isSelected
                      ? "linear-gradient(135deg, #4e54c8, #8f94fb)"
                      : "linear-gradient(135deg,  #ffffff, #f1f3f5)",
                    color: isDisabled
                      ? "#6c757d"
                      : isSelected
                      ? "white"
                      : "#212529",
                    border: isSelected
                      ? "2px solid  #4e54c8"
                      : "1px solid #ced4da",
                    boxShadow: isSelected
                      ? "0 0 8px rgba(78, 84, 200, 0.5)"
                      : "0 2px 4px rgba(0, 0, 0, 0.05)",
                        transition: "all 0.3s ease",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                   fontWeight: 600,
                    // fontSize: "14px",
                    // transition: "all 0.2s ease-in-out",
                    // userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isSelected)
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #e3e9ff, #d2d9ff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled && !isSelected)
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #ffffff, #e9ecef)";
                  }}
                >
                  {number}
                </div>
              );
            })}
          </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={onHide}>
            ❌ Cancel
          </Button>
          <div className="d-flex gap-2">
            <Button
              variant="danger"
              onClick={handelDelete}
              disabled={selectedSeatsToDelete.length === 0}
            >
              🗑 Delete
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              ✅ Confirm
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NumberSelector;
