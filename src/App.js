import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home'; // Adjust the import path if necessary
import AddNewTower from './pages/AddNewTower/AddNewTower'; // Create this component
import AddNewTemplate from './pages/AddNewTemplate/AddNewTemplate'; // Create this component
import AddNewEquipment from './pages/AddNewEquipment/AddNewEquipment'; // Create this component
import SplashScreen from './components/SplashScreen/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashEnd = () => {
    setShowSplash(false);
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', height: '100vh', width: '100vw' }}>
      <Router>
        {showSplash ? (
          <SplashScreen onEnd={handleSplashEnd} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-new-tower" element={<AddNewTower />} />
            <Route path="/add-new-template" element={<AddNewTemplate />} />
            <Route path="/add-new-equipment" element={<AddNewEquipment />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
