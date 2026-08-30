export interface ApiResponseError {
  success: false;
  message: string;
  error: {
    code: string;
    statusCode: number;
    details?: unknown;
  };
}
