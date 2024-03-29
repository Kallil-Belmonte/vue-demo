import request from '@/core/services/_files/request';
import type { RegisterUserPayload, LoginUserPayload, LoggedUser, User } from './types';

const { stringify } = JSON;

export const registerUser = (body: RegisterUserPayload): Promise<LoggedUser> =>
  request(`01051ce0-738b-4a05-972a-24a0be715d9d`, {
    method: 'POST',
    body: stringify(body),
  });

export const loginUser = (body: LoginUserPayload): Promise<LoggedUser> =>
  request(`01051ce0-738b-4a05-972a-24a0be715d9d`, {
    method: 'POST',
    body: stringify(body),
  });

export const getUser = (id: string): Promise<User> =>
  request(`23e90d18-0bb4-476b-b048-eef9a0cf7887?${new URLSearchParams({ id })}`);
