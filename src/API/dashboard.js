
import { GetCurrentConfigFile, SetCurrentConfigFile } from './symbiotik';

const DASHBOARD_API_URL = 'http://localhost:4200/server';

export const UpdateDashboard = async (newConfigFile) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConfigFile),
    };

    const response = await fetch(`${DASHBOARD_API_URL}/updateTemplate`, fetchOptions);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const fetchAndUpdateDashboard = async (configModifier = (config) => config, shouldSetCurrentConfig = true) => {
  var currentConfig = await GetCurrentConfigFile();

  currentConfig = configModifier(currentConfig);

  await UpdateDashboard(currentConfig);

  if (shouldSetCurrentConfig) {
    await SetCurrentConfigFile(currentConfig);
  }
};