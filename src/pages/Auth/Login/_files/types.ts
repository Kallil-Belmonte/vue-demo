export type FormData = {
  clearFormMessage: (field: string[], index: number) => void;
  setFieldClassName: (field: any, customClassNames: string[]) => string[];
  required: (value: string) => boolean;
  minLength: (value: string, min: number) => boolean;
  email: (value: string) => boolean;
  isLoading: boolean;
  form: {
    state: any;
    model: {
      email: string;
      password: string;
      keepLogged: boolean;
    };
    errors: {
      email: string[];
      password: string[];
    };
  };
};
