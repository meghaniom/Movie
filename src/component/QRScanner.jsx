// QRScanner.jsx
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ scannerId, onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(scannerId, {
      fps: 10,
      qrbox: 200,
    });

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        // Optional: Stop after one scan
        scanner.clear().catch(err => console.error("Failed to clear scanner", err));
      },
      (error) => {
        console.warn(`QR error (${scannerId}):`, error);
      }
    );

    return () => {
      // Properly stop the scanner when component unmounts
      scanner.clear().catch(err => console.error("Failed to clear scanner on unmount", err));
    };
  }, [scannerId, onScanSuccess]);

  return <div id={scannerId} />;
};

export default QRScanner;
