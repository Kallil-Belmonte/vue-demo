export type FormState = {
  loading: boolean;
  formSubmitted: boolean;
  serverErrors: {
    email: string[];
    password: string[];
    request: string[];
  };
};
