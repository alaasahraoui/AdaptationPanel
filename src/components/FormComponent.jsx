// FormComponent.js
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { action1 } from '../ConfigFiles/action1';
import { action2 } from '../ConfigFiles/action2';
import { action3 } from '../ConfigFiles/action3';
import actions from '../ConfigFiles/actions';
import strategies from '../ConfigFiles/strategies';

const FormComponent = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  // Filter actions based on the selected strategy ( gets updated when the user selects a strategy (reexecutes the function))
  const filteredActions = actions.filter(action => 
    action.strategyId === parseInt(selectedStrategy)
  );
  //debugging
console.log(filteredActions);
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="strategy-select-label">Strategy</InputLabel>
        <Select
          labelId="strategy-select-label"
          id="strategy-select"
          value={selectedStrategy}
          onChange={(e) => setSelectedStrategy(e.target.value)}
          displayEmpty
        >
           
          {strategies.map((strategy) => (
            <MenuItem key={strategy.strategy_id} value={strategy.strategy_id}>
              {strategy.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedStrategy != null && (
        //i added the != null to remove the bug if the id == 0 it will not show the action of that strategy
        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel id="action-select-label">Action</InputLabel>
          <Select
            labelId="action-select-label"
            id="action-select"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            displayEmpty
          >
           
            {filteredActions.map((action) => (
              <MenuItem key={action.actionId} value={action.actionId}>
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