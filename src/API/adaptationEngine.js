
const ADAPTATION_ENGINE_URL = 'http://localhost:3000';


export const sendStrategy = async (strategyID) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ strategyID }),
    };

    const response = await fetch(`${ADAPTATION_ENGINE_URL}/send-strategy`, fetchOptions);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
  