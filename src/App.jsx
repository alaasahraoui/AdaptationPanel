import React from 'react';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
 
import UnderDev from './pages/UnderDev';
const App = () => {
  return (
    <> 
    
      <Router>
      <Routes>
        
        <Route path="/auth" element={<AuthPage />} /> 
        <Route path="/signup" element={<UnderDev />} /> 
         
        <Route path="/MainPage" element={<MainPage />} />

        <Route path="/" element={<Navigate replace to="/auth" />}  />
      </Routes>
    </Router>
    </>
  );
};

export default App;