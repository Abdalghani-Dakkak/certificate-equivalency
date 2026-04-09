export {};

declare global {
  interface ApiState<T> {
    loading: boolean;
    value: T | null;
    errorMessage: string | null;
    success: boolean | null;
    error: boolean | null;
    reset: () => void;
    start: () => void;
    stopLoading: () => void;
    setError: (error: string) => void;
    setValue: (value: T) => void;
  }
}
