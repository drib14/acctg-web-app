import React from "react";

const LoadingModal = ({ isVisible }) => {
  if (!isVisible) return null; // If not visible, return nothing

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
