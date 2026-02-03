import React from 'react';

function StampCard({ stamp }) {
  return (
    <div className="stamp-card">
      <div className="stamp-design">
        <div className="stamp-circle">
          🗺️
        </div>
        <p className="stamp-location">{stamp.location.name}</p>
        <p className="stamp-country">{stamp.location.country}</p>
        <p className="stamp-date">{new Date(stamp.date).toLocaleDateString()}</p>
        <p className="stamp-type">{stamp.location.type}</p>
      </div>
    </div>
  );
}

export default StampCard;
