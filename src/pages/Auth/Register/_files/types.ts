export type FormData = {
  clearFormMessage: (field: string[], index: number) => void;
  setFieldClassName: (field: any, customClassNames: string[]) => string[];
  isLoading: boolean;
  form: {
    state: any;
    model: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
    feedback: {
      email: string[];
      password: string[];
    };
  };
};
