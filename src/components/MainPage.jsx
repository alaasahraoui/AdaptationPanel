import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import NavBar from './NavBar';
import SelectAdaptationModal from './SelectAdaptationModal';
import {GetDefaultConfigFile, SetCurrentConfigFile} from '../API/symbiotik'
import {UpdateDashboard} from '../API/dashboard'
import { sendStrategy } from '../API/adaptationEngine';
import '../styles/MainPage.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null)
  const [isRequestedByUser, setIsRequestedByUser] = useState(false)



  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('strategy', (strategyID) => {
     
      if (!isModalOpen) {
        setSelectedStrategy(strategyID);
        setIsModalOpen(true);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isModalOpen]);

  useEffect(()=> {
    if (isModalOpen && !isRequestedByUser) {
      alert('RL module has suggested a strategy');
    }
  }, [isModalOpen, isRequestedByUser])

  const handleRequestAdaptation = () => {
    const randomStrategy = Math.floor(Math.random() * 3);
    // instead of sending the strategy here, we should send a request to the RL module (or awareness module) to request an adaptation. 
    setIsRequestedByUser(true)
    sendStrategy(randomStrategy)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRequestedByUser(false)
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