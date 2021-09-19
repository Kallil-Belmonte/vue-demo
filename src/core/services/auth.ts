import { MOCKY_URL } from './files/endpoints';

export const registerUser = async () => {
  try {
    const response = await fetch(`${MOCKY_URL}/937dd5d6-8b1d-4e6e-8ae6-52ce820d6983`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const loginUser = async () => {
  try {
    const response = await fetch(`${MOCKY_URL}/3d898c30-a512-4415-b961-a2273323eefb`);
    return response.json();
  } catch (error) {
    throw error;
  }
};
