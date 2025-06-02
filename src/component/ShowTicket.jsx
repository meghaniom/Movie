// ShowTicket.jsx
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QRScanner from "./QRScanner";
import "../index.css";

const ShowTicket = ({ show, onHide, movie, numbers }) => {
  const [scanResultLeft, setScanResultLeft] = useState("");
  const [scanResultRight, setScanResultRight] = useState("");

  const seats = numbers?.length
    ? numbers.sort((a, b) => a - b).join(", ")
    : "None";

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="custom-modal-width"
    >
      <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-600 font-sans">
        {/* Header */}
        <div className="text-center text-2xl font-bold text-blue-700 mb-4">
          🎟️ Movie Ticket Pass
        </div>

        {/* Ticket Main */}
        <div className="grid grid-cols-10 rounded-xl overflow-hidden border border-gray-300 h-100">
          {/* Left side (Main Ticket) */}
          <div className="col-span-7 bg-gradient-to-br from-blue-100 to-blue-50 p-4">
            <div className="space-y-3 text-sm md:text-base">
              <div>
                <span className="font-semibold">Passenger:</span> Moviegoer
              </div>
              <div>
                <span className="font-semibold">From:</span>{" "}
                {movie?.From || "PVR Ahmedabad"}
              </div>
              <div>
                <span className="font-semibold">To:</span>{" "}
                {movie?.title || "Movie Title"}
              </div>
              <div>
                <span className="font-semibold">Date:</span>{" "}
                {movie?.date || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Time:</span>{" "}
                {movie?.time || "00:00"}
              </div>
              <div>
                <span className="font-semibold">Screen:</span>{" "}
                {movie?.screen || "A1"}
              </div>
              <div>
                <span className="font-semibold">Seats:</span> {seats}
              </div>
            </div>
            <div className="mt-4 w-32 h-32 bg-gray-200 rounded-md overflow-hidden">
              <QRScanner
                scannerId="left-scanner"
                onScanSuccess={(data) => {
                  setScanResultLeft(data);
                  alert(`Left QR Scanned: ${data}`);
                }}
              />
            </div>
          </div>

          {/* Dashed separator (mimics tear line) */}
          <div className="col-span-1 flex justify-center">
            <div className="border-l-2 border-dashed border-gray-400 h-full mx-auto" />
          </div>

          {/* Right side (Stub) */}
          <div className="col-span-2 bg-white p-4 text-xs md:text-sm space-y-2 text-right">
            <div>
              <span className="font-semibold">Movie:</span>{" "}
              {movie?.title || "Movie Title"}
            </div>
            <div>
              <span className="font-semibold">Date:</span>{" "}
              {movie?.date || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Time:</span>{" "}
              {movie?.time || "00:00"}
            </div>
            <div>
              <span className="font-semibold">Seats:</span> {seats}
            </div>
            <div>
              <span className="font-semibold">Gate:</span>{" "}
              {movie?.screen || "A1"}
            </div>
            <div>
              <span className="font-semibold">TKT No:</span> TKT-
              {Math.floor(Math.random() * 999999)}
            </div>
            <div className="mt-4 w-24 h-24 bg-gray-200 rounded-md overflow-hidden mx-auto">
              <QRScanner
                scannerId="right-scanner"
                onScanSuccess={(data) => {
                  setScanResultRight(data);
                  alert(`Right QR Scanned: ${data}`);
                }}
              />
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="flex justify-center mt-6">
          <div className="w-44 h-12 bg-[repeating-linear-gradient(90deg,_black_0px,_black_2px,_white_2px,_white_4px)] rounded" />
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShowTicket;
