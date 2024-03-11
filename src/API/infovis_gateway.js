// import currentConfig from '../adaptation/current.js'
// import defaultConfig from '../adaptation/default.js'

const INFOVIS_GATEWAY_URL = 'url'
const INFOVIS_GATEWAY_PORT = 'port';

// export const GetCurrentConfigFile = async () => {
//     const copyConfig = JSON.parse(JSON.stringify(currentConfig)); // deep copy
//     return copyConfig
//   };

// export const GetDefaultConfigFile = async () => {
//   /* make API call here */
//   return defaultConfig
// };

// export const SetCurrentConfigFile = async (newConfigFile) => {
//   /* make API call here */
//   Object.assign(currentConfig, newConfigFile); // Cela ne persiste que tant que l'application est en cours d'exécution
// };
  


export const postOperations = async (unique_id, operations, user) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          unique_id: unique_id,
          operations: operations,
          timestamp: Date.now(),
          user: user
        }
      ),
    };

    const response = await fetch(`${INFOVIS_GATEWAY_URL}:${INFOVIS_GATEWAY_PORT}/postOperations`, fetchOptions);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postConfig = async (unique_id, newConfigFile, user) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          unique_id: unique_id,
          adapt_config: newConfigFile,
          timestamp: Date.now(),
          user: user
        }
      ),
    };

    const response = await fetch(`${INFOVIS_GATEWAY_URL}:${INFOVIS_GATEWAY_PORT}/postConfig`, fetchOptions);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentConfig = async (user) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(`${INFOVIS_GATEWAY_URL}:${INFOVIS_GATEWAY_PORT}/getCurrentConfig`, fetchOptions);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
