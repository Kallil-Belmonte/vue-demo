export type FormData = {
  getFieldClass: (field: any, customClassNames: string[]) => string[];
  required: (value: string) => boolean;
  isLoading: boolean;
  form: {
    state: any;
    model: {
      title: string;
      body: string;
    };
  };
};
