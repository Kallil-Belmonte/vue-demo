import { MOCKY_URL } from '@/core/services/files/endpoints';
import { RegisterUserPayload, RegisterUser, LoginUserPayload, LoginUser } from './types';

const { stringify } = JSON;

export const registerUser = async (body: RegisterUserPayload): Promise<RegisterUser> => {
  try {
    const response = await fetch(`${MOCKY_URL}/97336d76-9f9a-4aa4-bd4a-e3e2170decb7`, {
      method: 'POST',
      body: stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (body: LoginUserPayload): Promise<LoginUser> => {
  try {
    const response = await fetch(`${MOCKY_URL}/3d898c30-a512-4415-b961-a2273323eefb`, {
      method: 'POST',
      body: stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
