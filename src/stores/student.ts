import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { apiExecutor } from 'src/shared/apiExecutor';
import { createApiState } from 'src/shared/apiState';
import type { FreeStudentInfo, Documents, LoginInfo } from 'src/types';
import { LocalStorage } from 'quasar';

export const useStudentStore = defineStore('student', {
  state: () => ({
    token: LocalStorage.getItem('token') || '',
    isLoggedIn: !!LocalStorage.getItem('token'),
    isEmailVerified: false,

    // Single source of truth for student info is now loginState
    // studentInfo removed
    profileImageBlob: null as string | null,
    idProofBlob: null as string | null,

    documents: {
      photo: null,
      ninthGradeCert: null,
      idCard: null,
      vocationalSeqDoc: null,
    } as Documents,

    loginState: createApiState<LoginInfo & Partial<FreeStudentInfo>>(),
    fetchProfileState: createApiState<FreeStudentInfo>(),
    verifyEmailState: createApiState<boolean>(),
    resendVerificationState: createApiState<boolean>(),
    // registerState and updateProfileState might need updates or removal based on backend changes
    // keeping them generic for now if needed, or removing if strictly following "delete unnecessary"
    registerState: createApiState<any>(),
    updateProfileState: createApiState<void>(),
  }),

  actions: {
      login(email: string, password: string, fn?: () => void) {
      return apiExecutor<LoginInfo>(
        this.loginState,
        () => api.post('/loginFreeStudent', { email, password }),
        {
          transform: (payload) => {
            const d = Array.isArray(payload) ? payload[0] : payload;
            return {
              token: String(d?.token ?? ''),
              verification: !!d?.verification,
              email: String(d?.email ?? email),
              first_name: String(d?.first_name ?? ''),
              last_name: String(d?.last_name ?? ''),
            };
          },
          onSuccess: (data) => {
            const tok = typeof data.token === 'string' ? data.token : '';
            this.token = tok;
            this.isLoggedIn = !!tok;
            this.isEmailVerified = !!data.verification;

            if (tok) {
              LocalStorage.setItem('token', tok);
              LocalStorage.set('loginInfo', data);
            } else {
              LocalStorage.remove('token');
              LocalStorage.remove('loginInfo');
            }
            fn?.();
          },
        }
      );
    },

    loadLoginInfo() {
      const stored = LocalStorage.getItem<LoginInfo>('loginInfo');
      if (stored) {
        this.loginState.value = stored;
        this.token = stored.token;
        this.isLoggedIn = true;
        this.isEmailVerified = stored.verification;
      }
    },

    async fetchProfile() {
      if (!this.token) return;
      await apiExecutor<FreeStudentInfo>(
        this.fetchProfileState,
        () => api.get('/getFreeStudentInfo'),
        {
          transform: (data) => {
            // Ensure data matches FreeStudentInfo interface
            // If API returns array, take first item
            const user = Array.isArray(data) ? data[0] : data;
            return user as FreeStudentInfo;
          },
          onSuccess: (data) => {
            const current = this.loginState.value || {} as Partial<LoginInfo>;
            this.loginState.value = { ...current, ...data } as LoginInfo & FreeStudentInfo;
          },
        },
        { showNotify: false }
      );
    },

    logout() {
      this.isLoggedIn = false;
      this.isEmailVerified = false;
      this.token = '';
      this.loginState.value = null;
      LocalStorage.remove('token');
      LocalStorage.remove('loginInfo');
      delete api.defaults.headers.common['Authorization'];
    },

      verifyEmail(code: string, fn?: () => void) {
      return apiExecutor<boolean>(
        this.verifyEmailState,
        () => api.post('/confirmFreeStudentOrder', { verification_code: code }),
        {
          transform: (data) => !!(data && (data.success ?? true)),
          onSuccess: (ok) => {
            if (ok) this.isEmailVerified = true;
            fn?.();
          },
        }
      );
    },

    async resendVerificationCode() {
      return apiExecutor<boolean>(
        this.resendVerificationState,
        () => api.post('/sendVerificationCodeByEmail'),
        {}
      );
    },

    async fetchStudentImages() {
      if (!this.token) return;

      const fetchImage = async (endpoint: string): Promise<string | null> => {
        try {
          const response = await api.get(endpoint, { responseType: 'blob' });
          if (response.data && response.data.size > 0) {
            return URL.createObjectURL(response.data);
          }
        } catch (error) {
          console.error(`Failed to fetch image from ${endpoint}`, error);
        }
        return null;
      };

      this.profileImageBlob = await fetchImage('/getFreeStudentPhoto');
      this.idProofBlob = await fetchImage('/getFreeStudentDocument');
    },


  },

  getters: {
    // Helper to safely access student info without null checks everywhere
    info: (state) => (state.loginState.value as FreeStudentInfo) || {} as Partial<FreeStudentInfo>,

    isProfileComplete: (state) => {
       const info = state.loginState.value as FreeStudentInfo;
       if (!info) return false;
       return !!(info.first_name && info.last_name && info.card_number && info.birth_date);
    }
  }
});
