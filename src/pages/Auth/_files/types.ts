export type FormState = {
  isLoading: boolean;
  isFormSubmitted: boolean;
  serverErrors: {
    email: string[];
    password: string[];
    request: string[];
  };
};
