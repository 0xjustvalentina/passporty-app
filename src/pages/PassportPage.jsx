import React, { useState } from 'react';
import AddStampModal from '../components/AddStampModal';
import StampCard from '../components/StampCard';

function PassportPage({ passport, onAddStamp, onBack }) {
  const [showAddStampModal, setShowAddStampModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const stampsPerPage = 4;
  const totalPages = Math.ceil(passport.stamps.length / stampsPerPage);
  const startIndex = currentPage * stampsPerPage;
  const currentStamps = passport.stamps.slice(startIndex, startIndex + stampsPerPage);

  const handleAddStamp = (stampData) => {
    onAddStamp(stampData);
    setShowAddStampModal(false);
  };

  return (
    <div className="passport-page">
      <button onClick={onBack} className="back-button">← Back</button>
      
      <div className="passport-header">
        <h2>PASSPORT</h2>
        <p>{passport.country.name}</p>
        {passport.photoUrl && (
          <img src={passport.photoUrl} alt="Passport owner" className="passport-photo" />
        )}
      </div>

      <div className="stamps-display">
        <h3>Your Stamps ({passport.stamps.length})</h3>
        
        {passport.stamps.length === 0 ? (
          <p className="no-stamps">No stamps yet. Start collecting!</p>
        ) : (
          <>
            <div className="stamps-grid">
              {currentStamps.map((stamp, index) => (
                <StampCard key={index} stamp={stamp} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  ← Previous
                </button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <button 
        onClick={() => setShowAddStampModal(true)} 
        className="add-stamp-button"
      >
        + Add Stamp
      </button>

      {showAddStampModal && (
        <AddStampModal 
          onClose={() => setShowAddStampModal(false)}
          onAddStamp={handleAddStamp}
        />
      )}
    </div>
  );
}

export default PassportPage;
