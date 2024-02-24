import React, { useState, useMemo, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import actions from '../ConfigFiles/actions';
import strategies from '../ConfigFiles/strategies';

const FormComponent = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [actionConfig, setActionConfig] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'strategyUpdate' && message.strategyId !== undefined) {
        setSelectedStrategy(message.strategyId.toString());
        setSelectedAction(''); // Reset action when strategy changes
        setActionConfig(null); // Reset config if necessary
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleStrategyChange = (e) => {
    setSelectedStrategy(e.target.value);
    setSelectedAction(''); // Reset action when strategy changes
  };

  // Define handleActionChange here
  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
    // Include any additional logic for when an action is selected
  };

  // useMemo to filter actions based on the selected strategy
  const filteredActions = useMemo(() => actions.filter(action => 
    action.strategyId === parseInt(selectedStrategy, 10)), [actions, selectedStrategy]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="strategy-select-label">Strategy</InputLabel>
        <Select
          labelId="strategy-select-label"
          id="strategy-select"
          value={selectedStrategy}
          onChange={handleStrategyChange}
          displayEmpty
        >
          {strategies.map((strategy) => (
            <MenuItem key={strategy.strategy_id} value={strategy.strategy_id.toString()}>
              {strategy.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedStrategy && (
        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel id="action-select-label">Action</InputLabel>
          <Select
            labelId="action-select-label"
            id="action-select"
            value={selectedAction}
            onChange={handleActionChange}
            displayEmpty
          >
            {filteredActions.map((action) => (
              <MenuItem key={action.actionId} value={action.actionId.toString()}>
                {action.actionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default FormComponent;
