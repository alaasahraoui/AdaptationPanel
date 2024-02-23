import React, { useState } from 'react';
import NavBar from './NavBar';
import SelectAdaptationModal from './SelectAdaptationModal';
import {GetDefaultConfigFile, SetCurrentConfigFile} from '../API/symbiotik'
import {UpdateDashboard} from '../API/dashboard'
import '../styles/MainPage.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null)

  const handleRequestAdaptation = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      const randomStrategy = Math.floor(Math.random() * 3);
      setSelectedStrategy(randomStrategy);
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStrategy(null)
  };

  const resetDashboard = () => {
    GetDefaultConfigFile().then((defaultConfig) => {
      UpdateDashboard(defaultConfig)
      SetCurrentConfigFile(defaultConfig)
    })
  }

  return (
    <>
      <NavBar />
      <div className="main-content">
        <div className="buttons-container">
          <button className="button request-button" onClick={handleRequestAdaptation}>
            Request Adaptation
          </button>
          <button className="button reset-button" onClick={resetDashboard}>
            Reset Dashboard
          </button>
        </div>
        {isModalOpen && <SelectAdaptationModal onClose={handleCloseModal} strategy={selectedStrategy} />}
      </div>
    </>
  );
};

export default MainPage;