export type FormData = {
  clearFormMessage: (field: string[], index: number) => void;
  setFieldClassName: (field: any, customClassNames: string[]) => string[];
  required: (value: string) => boolean;
  minLength: (value: string, min: number) => boolean;
  email: (value: string) => boolean;
  isLoading: boolean;
  favoriteColors: [];
  form: {
    state: any;
    model: {
      firstName: string;
      lastName: string;
      email: string;
      telephone: string;
      sex: string;
      favoriteColor: string;
      employed: boolean;
      message: string;
    };
    feedbackMessages: {
      success: string[];
    };
  };
};
