export interface ErrorResponseOptions<T> {
    message: string;
    errors?: T;
  }
  
  export const ErrorResponse = <T>(
    options: ErrorResponseOptions<T>,
  ) => ({
    message: options.message,
    errors: options.errors ?? null,
  });