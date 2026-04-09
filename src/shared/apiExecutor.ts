import { handleError } from 'src/stores/handle-error';

type Callbacks<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: string, originalError?: any) => void;
  onFinally?: () => void;
  beforeStart?: () => void;
  transform?: (data: any) => T;
};

type Options = {
  showNotify?: boolean;
  preventConcurrent?: boolean;
};

export async function apiExecutor<T>(
  state: ApiState<T>,
  request: (signal?: AbortSignal) => Promise<any>,
  callbacks?: Callbacks<T>,
  options: Options = { showNotify: true, preventConcurrent: true }
): Promise<T | undefined> {
  // منع تداخل الطلبات إذا تم تفعيل الخيار
  if (options.preventConcurrent && state.loading) {
    return undefined;
  }

  if (callbacks?.beforeStart) {
    callbacks.beforeStart();
  }

  state.start();

  try {
    // دعم الـ AbortController مستقبلاً
    const controller = new AbortController();
    const response = await request(controller.signal);

    // التحقق بدقة مما إذا كان الرد من Axios لتجنب استخراج خاطئ للبيانات
    let payload =
      response &&
      typeof response === 'object' &&
      'data' in response &&
      'config' in response &&
      'headers' in response
        ? response.data
        : response;

    if (callbacks?.transform) {
      payload = callbacks.transform(payload);
    }

    state.setValue(payload as T);

    if (callbacks?.onSuccess) {
      callbacks.onSuccess(payload as T);
    }
    return payload as T;
  } catch (error: any) {
    // التعامل مع إلغاء الطلب بشكل صامت
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      return undefined;
    }

    const msg = handleError(error, options.showNotify);
    state.setError(msg);

    if (callbacks?.onError) {
      callbacks.onError(msg, error);
    }
    return undefined;
  } finally {
    state.stopLoading();
    if (callbacks?.onFinally) {
      callbacks.onFinally();
    }
  }
}
