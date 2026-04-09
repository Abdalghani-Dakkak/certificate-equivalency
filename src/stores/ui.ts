import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setLoading(status: boolean) {
      this.loading = status;
    },
    setError(message: string | null) {
      this.error = message;
    },
  },
});
