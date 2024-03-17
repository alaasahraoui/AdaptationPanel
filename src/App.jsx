import React from 'react';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
 
import UnderDev from './pages/UnderDev';
const App = () => {
  return (
    <> 
    
      <Router>
      <Routes>
        
 
        <Route path="/MainPage" element={<MainPage />} />

        <Route path="/" element={<Navigate replace to="/MainPage" />}  />
      </Routes>
    </Router>
    </>
  );
};

export default App;