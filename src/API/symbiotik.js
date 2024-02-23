import currentConfig from '../adaptation/current.js'
import defaultConfig from '../adaptation/default.js'

export const GetCurrentConfigFile = async () => {
    const copyConfig = JSON.parse(JSON.stringify(currentConfig)); // deep copy
    return copyConfig
  };

  export const GetDefaultConfigFile = async () => {
    /* make API call here */
    return defaultConfig
  };

export const SetCurrentConfigFile = async (newConfigFile) => {
  /* make API call here */
  Object.assign(currentConfig, newConfigFile); // Cela ne persiste que tant que l'application est en cours d'exécution
};
  