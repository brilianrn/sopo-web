export interface IUsecaseResponse<T extends object | void> {
  error?: Error;
  message?: string;
  data?: T;
}

export interface ISelectOption {
  value: string;
  label: string;
}
