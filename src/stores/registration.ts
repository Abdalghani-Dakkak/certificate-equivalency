import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { apiExecutor } from 'src/shared/apiExecutor';
import { createApiState } from 'src/shared/apiState';
import { ListEndPoint } from 'src/end-point/list-end-point';
import type { ExaminationPeriodOpened, RegistrationFreeStudentOrder } from 'src/types';

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    examinationPeriods: [] as ExaminationPeriodOpened[],
    getExaminationPeriodOpenedState: createApiState<ExaminationPeriodOpened[]>(),
    addRegistrationState: createApiState<void>(),
  }),
  actions: {
    async getExaminationPeriodOpened() {
      return apiExecutor(
        this.getExaminationPeriodOpenedState,
        () => api.get(ListEndPoint.getExaminationPeriodOpened),
        {
          beforeStart: () => {
            this.examinationPeriods = [];
            this.getExaminationPeriodOpenedState.start();
          },
          onSuccess: (data) => {
            this.examinationPeriods = data as ExaminationPeriodOpened[];
            this.getExaminationPeriodOpenedState.setValue(data);
          },

          onFinally: () => {
            this.getExaminationPeriodOpenedState.stopLoading();
          },
        },
      );
    },
    async addRegistrationFreeStudentOrder(data: RegistrationFreeStudentOrder, files: { [key: string]: File | null },fn?:()=>void) {
      return apiExecutor(
        this.addRegistrationState,
        () => {
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            const value = (data as any)[key];
            if (value !== undefined && value !== null) {
              formData.append(key, value.toString());
            }
          });
          Object.keys(files).forEach((key) => {
            const file = files[key];
            if (file) {
              formData.append(key, file);
            }
          });
          return api.post(ListEndPoint.addRegistrationFreeStudentOrder, formData);
        },
        {
          beforeStart: () => {
            this.addRegistrationState.start();
          },
          onSuccess: () => {
            this.addRegistrationState.stopLoading();
            fn?.();
          },

          onFinally: () => {
            this.addRegistrationState.stopLoading();
          },
        }
      );
    },
  },
});
