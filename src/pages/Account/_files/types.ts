export type FormData = {
  clearFormMessage: (field: string[], index: number) => void;
  setFieldClassName: (field: any, customClassNames: string[]) => string[];
  required: (value: string) => boolean;
  minLength: (value: string, min: number) => boolean;
  email: (value: string) => boolean;
  form: {
    state: any;
    model: {
      firstName: string;
      lastName: string;
      email: string;
    };
    errors: {
      email: string[];
    };
    feedback: {
      success: string[];
      error: string[];
    };
  };
};
