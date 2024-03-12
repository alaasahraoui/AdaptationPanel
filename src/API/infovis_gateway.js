// import currentConfig from '../adaptation/current.js'
// import defaultConfig from '../adaptation/default.js'

// const INFOVIS_GATEWAY_URL = 'url'
// const INFOVIS_GATEWAY_PORT = 'port';

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

    const response = await fetch(import.meta.env.VITE_GATEWAY + '/postOperations', fetchOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch config');
    }

    const data = await response.json();

    return data;
    
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
          config: newConfigFile,
          timestamp: Date.now(),
          user: user
        }
      ),
    };

    const response = await fetch(import.meta.env.VITE_GATEWAY + '/postConfig', fetchOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch config');
    }

    const data = await response.json();


    return data;
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
      body: JSON.stringify({"user":user}),
    };
    

    const response = await fetch(import.meta.env.VITE_GATEWAY + '/getCurrentConfig', fetchOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch config');
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
  }
};
