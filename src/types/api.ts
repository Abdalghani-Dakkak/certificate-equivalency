export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiMessageResponse {
  success: boolean;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface HealthResponse {
  success: true;
  message: string;
  timestamp: string;
}
