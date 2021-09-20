import {
  RegisterUserPayload,
  RegisterUserResponse,
  LoginUserPayload,
  LoginUserResponse,
} from './types';
import { MOCKY_URL } from '../files/endpoints';

const { stringify } = JSON;

export const registerUser = async (body: RegisterUserPayload): Promise<RegisterUserResponse> => {
  try {
    const response = await fetch(`${MOCKY_URL}/937dd5d6-8b1d-4e6e-8ae6-52ce820d6983`, {
      method: 'POST',
      body: stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (body: LoginUserPayload): Promise<LoginUserResponse> => {
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
