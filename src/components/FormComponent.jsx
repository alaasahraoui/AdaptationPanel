// FormComponent.js
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { action1 } from '../ConfigFiles/action1';
import { action2 } from '../ConfigFiles/action2';
import { action3 } from '../ConfigFiles/action3';

const FormComponent = () => {

  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');

  const strategies = ['Reduce Cognitive', 'Redistribution strategy', 'Replacement Strategy'];
  const strategyDetails = {
    'Reduce Cognitive': ['Action1','Action2','Action3'],
    'Redistribution strategy': ['Action1','Action2','Action3'],
    'Replacement Strategy': ['Action1','Action2','Action3'],
  };
  const actionObjects = {
    'Action1': action1,
    'Action2': action2,
    'Action3': action3
  };
  const handleStrategyChange = (event) => {
    setSelectedStrategy(event.target.value);
    setSelectedDetail(''); // Reset second dropdown when first changes
  };

  const handleDetailChange = (event) => {
    setSelectedDetail(event.target.value);
    console.log(event.target.value);
    console.log(actionObjects[event.target.value]); 
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="strategy-select-label">Select Strategy</InputLabel>
      <Select
        labelId="strategy-select-label"
        id="strategy-select"
        value={selectedStrategy}
        label="Select Strategy"
        onChange={handleStrategyChange}
      >
        {strategies.map((strategy) => (
          <MenuItem key={strategy} value={strategy}>{strategy}</MenuItem>
        ))}
      </Select>

      {selectedStrategy && (
        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel id="detail-select-label">Select Detail</InputLabel>
          <Select
            labelId="detail-select-label"
            id="detail-select"
            value={selectedDetail}
            label="Select Detail"
            onChange={handleDetailChange}
          >
            {strategyDetails[selectedStrategy].map((detail) => (
              <MenuItem key={detail} value={detail}>{detail}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </FormControl>
  );
};

export default FormComponent;
