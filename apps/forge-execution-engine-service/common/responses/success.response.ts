export interface SuccessResponseOptions<T> {
    message: string;
    data?: T;
  }
  
  export const SuccessResponse = <T>(
    options: SuccessResponseOptions<T>,
  ) => ({
    message: options.message,
    data: options.data ?? null,
  });