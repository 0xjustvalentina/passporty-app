import React, { useState } from 'react';

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'France', code: 'FR' },
  { name: 'Spain', code: 'ES' },
  { name: 'Italy', code: 'IT' },
  { name: 'Germany', code: 'DE' },
  { name: 'Japan', code: 'JP' },
  { name: 'Canada', code: 'CA' },
  { name: 'Mexico', code: 'MX' }
];

function LandingPage({ onCountrySelect }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStart = () => {
    if (selectedCountry && photoUrl) {
      onCountrySelect(selectedCountry, photoUrl);
    } else {
      alert('Please select a country and upload a photo');
    }
  };

  return (
    <div className="landing-page">
      <h1>Passporty</h1>
      
      <div className="landing-container">
        <div className="photo-section">
          <div className="photo-circle">
            {photoUrl ? (
              <img src={photoUrl} alt="Passport" />
            ) : (
              <span>📷</span>
            )}
          </div>
          <input 
            type="file" 
            accept="image/*"
            onChange={handlePhotoUpload}
            className="photo-input"
          />
          <label>Upload your passport photo</label>
        </div>

        <div className="country-section">
          <label>Select your passport country:</label>
          <select 
            value={selectedCountry ? selectedCountry.code : ''} 
            onChange={(e) => {
              const country = countries.find(c => c.code === e.target.value);
              setSelectedCountry(country);
            }}
            className="country-select"
          >
            <option value="">-- Choose Country --</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleStart} className="start-button">
          Start Collecting Stamps
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
