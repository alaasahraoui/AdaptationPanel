import React, { useState, useMemo, useEffect  } from 'react';
import LoadingSpinner from './LoadingSpinner';
import OptionCard from './OptionCard'
import adaptations from '../adaptation/adaptations';
import strategies  from '../adaptation/strategies';
import {fetchAndUpdateDashboard} from '../API/dashboard'
import '../styles/SelectAdaptationModal.css';

const AdaptationModal = ({ onClose, strategy  }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeEyeIndex, setActiveEyeIndex] = useState(null);
  const [dashboardupdated, setDashboardupdated] = useState(false);
  const [fitnessScores, setFitnessScores] = useState([]);
  
  const availableOptions = useMemo(() => adaptations.filter(adaptation => 
    adaptation.strategies.includes(parseInt(strategy, 10))), [strategy]);

  useEffect(() => {
    if (activeEyeIndex !== null) {
      fetchAndUpdateDashboard(config => {
        const adaptationList = [availableOptions[activeEyeIndex]];
        adaptationList.forEach(adaptation => {
          config = adaptation.adapt(config, {});
        });
        return config;
      }, false);
      setDashboardupdated(true)

    } else if (dashboardupdated) {
      // go back to current config if activeEyeIndex is null AND if dashboard was updated before
      fetchAndUpdateDashboard(currentConfig => currentConfig, false);
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
      fetchAndUpdateDashboard(config => {
        const adaptationList = [availableOptions[selectedOption]];
        adaptationList.forEach(adaptation => {
          config = adaptation.adapt(config, {});
        });
        return config;
      }, true);

      onClose()
    }
  };

  const closeModal = async () => {
    if (activeEyeIndex !== null) {
      fetchAndUpdateDashboard(currentConfig => currentConfig, false);
    }
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