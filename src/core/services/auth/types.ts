export type RegisterUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  kind: string;
  localId: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  registered: true;
  refreshToken: string;
  expiresIn: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
  keepLogged: boolean;
};

export type LoginUserResponse = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  expiresIn: string;
};
