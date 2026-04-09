import { reactive, ref } from 'vue';

export function createApiState<T>(): ApiState<T> {
  const _value = ref<T | null>(null);

  return reactive({
    loading: false as boolean,
    get value() {
      return _value.value;
    },
    set value(v: T | null) {
      _value.value = v;
    },
    errorMessage: null as string | null,
    success: null as boolean | null,
    error: false as boolean,

    reset() {
      this.loading = false;
      this.value = null;
      this.errorMessage = null;
      this.success = null;
      this.error = false;
    },

    start() {
      this.loading = true;
      this.value = null;
      this.errorMessage = null;
      this.success = null;
      this.error = false;
    },

    stopLoading() {
      this.loading = false;
    },

    setError(error: string) {
      this.errorMessage = error;
      this.loading = false;
      this.success = false;
      this.error = true;
    },

    setValue(value: T) {
      this.value = value;
      this.loading = false;
      this.success = true;
    },
  }) as ApiState<T>;
}
