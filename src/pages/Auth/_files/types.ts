export type FormState = {
  isLoading: boolean;
  serverErrors: {
    email: string[];
    password: string[];
    request: string[];
  };
};
