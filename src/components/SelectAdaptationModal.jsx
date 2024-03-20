import React, { useState, useMemo, useEffect  } from 'react';
import LoadingSpinner from './LoadingSpinner';
import OptionCard from './OptionCard'
import adaptations from '../adaptation/adaptations';
import strategies  from '../adaptation/strategies';
import { getCurrentConfig, postConfig, postOperations } from '../API/infovis_gateway';
import '../styles/SelectAdaptationModal.css';


const AdaptationModal = ({ onClose, strategy, unique_id, user  }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeEyeIndex, setActiveEyeIndex] = useState(null);
  const [initialConfig, setInitialConfig] = useState(null)
  const [dashboardupdated, setDashboardupdated] = useState(false);
  const [fitnessScores, setFitnessScores] = useState([]);
  
  const availableOptions = useMemo(() => adaptations.filter(adaptation => 
    adaptation.strategies.includes(parseInt(strategy, 10))), [strategy]);

  useEffect(() => {
    getCurrentConfig(user)
      .then(config => setInitialConfig(config))
  }, []);

  useEffect(() => {
    if (activeEyeIndex !== null) {
      var config = JSON.parse(JSON.stringify(initialConfig))
      const adaptationList = [availableOptions[activeEyeIndex]];
      adaptationList.forEach(adaptation => {
        config = adaptation.adapt(config, {});
      });
      
      //set temporal title when the user is testing adaptations
      let tempConfig = JSON.parse(JSON.stringify(config))
      tempConfig.title = tempConfig.title + activeEyeIndex
      postConfig(unique_id, tempConfig, user);
      setDashboardupdated(true)

    } else if (dashboardupdated) {
      // go back to initial config if activeEyeIndex is null AND if dashboard was updated before
      postConfig(unique_id, initialConfig, user);
      setDashboardupdated(false)
    }
  }, [activeEyeIndex]);


  useEffect(() => {
    // Generate a random fitness score for each available option
    const scores = availableOptions.map(() =>
      Math.floor(Math.random() * (100 - 50 + 1) + 50)
    );
    setFitnessScores(scores);
  }, [availableOptions]);



  const strategyInfo = strategies.find(elem => elem.strategy_id === strategy);

  const isButtonDisabled = selectedOption === null;


  const handleSelectOption = (index) => {
    setSelectedOption(selectedOption === index ? null : index);
  };

  const handleSeeOption = async  (index) => {
    setActiveEyeIndex(activeEyeIndex === index ? null : index)
  };

  const handleValidate = async () => {
    if (!isButtonDisabled) {
      var config = JSON.parse(JSON.stringify(initialConfig))
      const adaptationList = [availableOptions[selectedOption]];
      adaptationList.forEach(adaptation => {
        config = adaptation.adapt(config, {});
      });
      
      //each time user validates or rejects, set a new "unique" title
      config.title = config.title + unique_id;
      const responseConfig = await postConfig(unique_id, config, user);
      console.log(responseConfig)

      const operationList = adaptationList.map(adaptation => ({
        adaptationName : adaptation.actionName,
        adaptationDescription : adaptation.actionName,
        adaptationParameters : adaptation.defaultParameters
      }))

      const responseOperations = await postOperations(unique_id, operationList, user);
      console.log(responseOperations)
      


      // fetchAndUpdateDashboard(config => {
      //   const adaptationList = [availableOptions[selectedOption]];
      //   adaptationList.forEach(adaptation => {
      //     config = adaptation.adapt(config, {});
      //   });
      //   return config;
      // }, true);


      onClose()
    }
  };

  const closeModal = async () => {
    // if (activeEyeIndex !== null) {
    //   fetchAndUpdateDashboard(currentConfig => currentConfig, false);
    // }
    const rejectedOperation = {adaptationName: "reject", adaptationDescription: "reject adaptation", adaptationParameters: {}};
    const responseOperations = await postOperations(unique_id, rejectedOperation, user);
    console.log(responseOperations)
    onClose()
  };


  return (
    <div className="modal">
      <div className="cancel-button" onClick={closeModal}>
        X
      </div>
      {strategy === null ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='modal-content'>
            <div className='strategy-container'>
              <h1>Selected Strategy: {strategyInfo.name}</h1>
            </div>
            <div className="options-container">
            {availableOptions.map((adaptation, index) => (
              <OptionCard 
                key={index}
                title={`Option ${index + 1}`}
                adaptations={[adaptation.actionName]}
                onSee={() => handleSeeOption(index)}
                onSelect={() => handleSelectOption(index)}
                isSelected={selectedOption === index}
                isEyeActive={activeEyeIndex === index}
                fitnessScore={fitnessScores[index]}
                isBestOption={index === fitnessScores.indexOf(Math.max(...fitnessScores))}
              />
            ))}
          </div>
            <div className='validation-button-container'>
              <button 
                className={`validate-button ${isButtonDisabled ? 'disabled' : 'active'}`}
                onClick={handleValidate}
                disabled={isButtonDisabled}
              >
                VALIDATE
              </button>
            </div>
          </div>
          
        </>
      )}
    </div>
  );
};

export default AdaptationModal;
