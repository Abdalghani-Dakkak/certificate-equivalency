import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { StudentEndPoint } from 'src/end-point/student-end-point';
import { apiExecutor } from 'src/shared/apiExecutor';
import { createApiState } from 'src/shared/apiState';
import type { LoginInfo } from 'src/types';
import { LocalStorage } from 'quasar';

type ApiPayload<T> = {
  success?: boolean;
  data?: T;
};

function unwrapPayload<T>(payload: T | ApiPayload<T> | null | undefined): T | null {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data ?? null;
  }

  return (payload ?? null) as T | null;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

export const useStudentStore = defineStore('student', {
  state: () => ({
    token: LocalStorage.getItem('token') || '',
    isLoggedIn: !!LocalStorage.getItem('token'),
    isEmailVerified: false,
    loginState: createApiState<LoginInfo>(),
    verifyEmailState: createApiState<boolean>(),
    resendVerificationState: createApiState<boolean>(),
  }),

  actions: {
    login(email: string, password: string, fn?: () => void) {
      return apiExecutor<LoginInfo>(
        this.loginState,
        () => api.post(StudentEndPoint.login, { email, password }),
        {
          transform: (payload) => {
            const data = unwrapPayload<Record<string, unknown>>(payload) ?? {};

            return {
              token: asString(data.token),
              verification: asBoolean(data.verification, asBoolean(data.is_verified)),
              email: asString(data.email, email),
              first_name: asString(data.first_name),
              last_name: asString(data.last_name),
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
        () =>
          api.post(StudentEndPoint.verifyEmail, {
            verification_code: code,
            token: this.token,
          }),
        {
          transform: (payload) => {
            const data = unwrapPayload<Record<string, unknown> | boolean>(payload);
            if (typeof data === 'boolean') {
              return data;
            }

            return asBoolean(data?.success, true);
          },
          onSuccess: (ok) => {
            if (ok) {
              this.isEmailVerified = true;
            }

            fn?.();
          },
        }
      );
    },

    async resendVerificationCode() {
      return apiExecutor<boolean>(
        this.resendVerificationState,
        () =>
          api.post(StudentEndPoint.resendVerificationCode, {
            token: this.token,
          }),
        {
          transform: (payload) => {
            const data = unwrapPayload<Record<string, unknown> | boolean>(payload);
            if (typeof data === 'boolean') {
              return data;
            }

            return asBoolean(data?.success, true);
          },
        }
      );
    },
  },
});