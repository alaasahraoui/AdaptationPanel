import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import NavBar from '../components/NavBar';
import SelectAdaptationModal from '../components/SelectAdaptationModal';
// import {GetDefaultConfigFile, SetCurrentConfigFile} from '../API/infovis_gateway'
// import {UpdateDashboard} from '../API/AVT'
import '../styles/MainPage.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null)
  const [unique_id, setUniqueID] = useState(null)
  const [user, setUser] = useState(null)
  // const [isRequestedByUser, setIsRequestedByUser] = useState(false)


  useEffect(() => {

    //this is how socket can listen on servers that run under paths
    const socket = io(import.meta.env.VITE_ENGINE_SERV , {path: '/server_engine/socket.io'});


    socket.on('strategy', (data) => {
      if (!isModalOpen) {
        alert('RL module has suggested a strategy');
        setSelectedStrategy(data.strategyID);
        setUniqueID(data.unique_id);
        setIsModalOpen(true);
        setUser(data.user)
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isModalOpen]);

  // useEffect(()=> {
  //   if (isModalOpen /* && !isRequestedByUser */) {
  //     alert('RL module has suggested a strategy');
  //   }
  // }, [isModalOpen, /*isRequestedByUser*/])

  /*
  const handleRequestAdaptation = () => {
    const randomStrategy = Math.floor(Math.random() * 3);
    // instead of sending the strategy here, we should send a request to the RL module (or awareness module) to request an adaptation. 
    setIsRequestedByUser(true)
    sendStrategy(randomStrategy)
  };

  const resetDashboard = () => {
    GetDefaultConfigFile().then((defaultConfig) => {
      UpdateDashboard(defaultConfig)
      SetCurrentConfigFile(defaultConfig)
    })
  }
  */

  const handleCloseModal = () => {
    setIsModalOpen(false);
    //setIsRequestedByUser(false)
    setSelectedStrategy(null)
    setUniqueID(null)
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        {/*<div className="buttons-container">
          <button className="button request-button" onClick={handleRequestAdaptation}>
            Request Adaptation
          </button>
          <button className="button reset-button" onClick={resetDashboard}>
            Reset Dashboard
          </button>
        </div>*/} 
        {isModalOpen && <SelectAdaptationModal onClose={handleCloseModal} strategy={selectedStrategy} unique_id={unique_id} user={user} />}
      </div>
    </>
  );
};

export default MainPage;