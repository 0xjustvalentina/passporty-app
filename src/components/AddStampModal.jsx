import React, { useState } from 'react';

const locations = [
  { name: 'Paris', country: 'France', type: 'airport' },
  { name: 'Barcelona', country: 'Spain', type: 'port' },
  { name: 'Rome', country: 'Italy', type: 'airport' },
  { name: 'Berlin', country: 'Germany', type: 'border' },
  { name: 'Tokyo', country: 'Japan', type: 'airport' },
  { name: 'New York', country: 'United States', type: 'airport' },
  { name: 'Cancun', country: 'Mexico', type: 'airport' },
  { name: 'London', country: 'United Kingdom', type: 'airport' }
];

function AddStampModal({ onClose, onAddStamp }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = () => {
    if (selectedLocation && selectedDate) {
      const stamp = {
        location: selectedLocation,
        date: selectedDate,
        id: Date.now()
      };
      onAddStamp(stamp);
    } else {
      alert('Please select a location and date');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Stamp</h2>
        
        <div className="modal-section">
          <label>Location:</label>
          <select 
            value={selectedLocation ? selectedLocation.name : ''} 
            onChange={(e) => {
              const location = locations.find(l => l.name === e.target.value);
              setSelectedLocation(location);
            }}
            className="modal-select"
          >
            <option value="">-- Choose Location --</option>
            {locations.map(location => (
              <option key={location.name} value={location.name}>
                {location.name} ({location.type}) - {location.country}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-section">
          <label>Date:</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="modal-buttons">
          <button onClick={onClose} className="modal-cancel">Cancel</button>
          <button onClick={handleSubmit} className="modal-submit">Add Stamp</button>
        </div>
      </div>
    </div>
  );
}

export default AddStampModal;
