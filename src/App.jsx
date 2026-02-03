import React, { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import PassportPage from './pages/PassportPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userPassport, setUserPassport] = useState({
    country: null,
    photoUrl: null,
    stamps: []
  });

  const handleCountrySelect = (country, photoUrl) => {
    setUserPassport({
      ...userPassport,
      country: country,
      photoUrl: photoUrl
    });
    setCurrentPage('passport');
  };

  const handleAddStamp = (stamp) => {
    setUserPassport({
      ...userPassport,
      stamps: [...userPassport.stamps, stamp]
    });
  };

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage onCountrySelect={handleCountrySelect} />
      ) : (
        <PassportPage 
          passport={userPassport} 
          onAddStamp={handleAddStamp}
          onBack={() => setCurrentPage('landing')}
        />
      )}
    </div>
  );
}

export default App;
