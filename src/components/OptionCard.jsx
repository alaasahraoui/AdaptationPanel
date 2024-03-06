import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/OptionCard.css';

const OptionCard = ({ title, adaptations, onSee, onSelect, isSelected, isEyeActive, fitnessScore ,isBestOption}) => {


  const handleClick = () => {
    onSelect();
  };

  const handleEyeClick = (e) => {
    e.stopPropagation();
    onSee();
  };

  return (
    <div className={`option-card ${isSelected ? 'selected' : ''} ${isBestOption ? 'best-option' : ''}`} onClick={handleClick}>
      <div className="select-checkbox" onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}>
        {isSelected ? '✓' : ''}
      </div>
      <div className='card-content'>
        <div className='title-container'>
          <h2>{title}</h2>
        </div>
        <div className='list-container'>
          <ul>
            {adaptations.map((adaptation, index) => (
              <li key={index}>{adaptation}</li>
            ))}
            <div style={{ marginTop: '10px' }}>{fitnessScore}%</div>
          </ul>
        </div>
        <div className='button-container'>
          <FontAwesomeIcon icon={isEyeActive ? faEyeSlash : faEye } className={`eye-icon ${isEyeActive ? 'active' : 'inactive'}`} onClick={handleEyeClick} />
        </div>
      </div>
      
    </div>
  );
};

export default OptionCard;
