import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { apiExecutor } from 'src/shared/apiExecutor';
import { createApiState } from 'src/shared/apiState';
import type { ExamCycle, FreeStudentExaminationRegistration, RegistrationInput } from 'src/types';

export const useExamStore = defineStore('exam', {
  state: () => ({
    availableCycles: [] as ExamCycle[],
    myRegistrations: [] as FreeStudentExaminationRegistration[],

    // API States
    fetchCyclesState: createApiState<ExamCycle[]>(),
    fetchRegistrationsState: createApiState<FreeStudentExaminationRegistration[]>(),
    fetchMoreDocumentsState: createApiState<Blob | null>(),
    registerState: createApiState<FreeStudentExaminationRegistration>(),
    confirmPaymentState: createApiState<boolean>(),
    updateStatusState: createApiState<void>(),
  }),

  actions: {
    async fetchCycles() {
      return apiExecutor<ExamCycle[]>(
        this.fetchCyclesState,
        () => api.get('/getExaminationPeriodOpened'),
        {
          transform: (data) => {
            // Map backend response to frontend type
            return data.map((cycle: any) => ({
              ...cycle,
              // Map to legacy fields if needed for UI compatibility until refactored
              startDate: cycle.start_registration_date,
              endDate: cycle.end_registration_date,
              status: 'open', // Since endpoint is getExaminationPeriodOpened
              fees: 0, // Default or fetch if available
            }));
          },
          onSuccess: (data) => {
            this.availableCycles = data;
          },
        },
      );
    },

    async fetchRegistrations() {
      return apiExecutor<FreeStudentExaminationRegistration[]>(
        this.fetchRegistrationsState,
        () => api.get('/getFreeStudentExaminationPeriod'),
        {
          onSuccess: (data) => {
            this.myRegistrations = data;
          },
        },
      );
    },

    async fetchMoreDocuments(registrationId: number) {
      return apiExecutor<Blob | null>(this.fetchMoreDocumentsState, () =>
        api.get(`/getFreeStudentExaminationPeriodMoreDocument/${registrationId}`, {
          responseType: 'blob',
        }),
      );
    },

    async registerForCycle(
      cycleId: number,
      details: RegistrationInput,
      files?: File[] | { attachments?: File[] },
    ) {
      return apiExecutor<FreeStudentExaminationRegistration>(
        this.registerState,
        () => {
          // Resolve single document file (PDF) named 'document'
          let documentFile: File | undefined;
          if (Array.isArray(files)) {
            documentFile = files[0];
          } else if (files && files.attachments && files.attachments.length > 0) {
            documentFile = files.attachments[0];
          }

          const payload = details as Record<string, any>;
          payload.examination_period_id = Number(cycleId);
          // Always send multipart/form-data with a single 'document' file when available
          const formData = new FormData();
          Object.entries(payload).forEach(([k, v]) => {
            if (v !== undefined && v !== null) formData.append(k, String(v));
          });
          if (documentFile) formData.append('document', documentFile);
          return api.post('/addFreeStudentExaminationPeriod', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        },
        {
          onSuccess: async () => {
            // Refresh registrations
            await this.fetchRegistrations();
          },
        },
      );
    },

    async confirmPayment(registrationId: number, code: string) {
      return apiExecutor<boolean>(
        this.confirmPaymentState,
        () =>
          api.post('/confirmFreeStudentExaminationPeriodPaid', {
            free_student_examination_period_id: registrationId,
            verification_code: code,
          }),
        {
          transform: () => true,
          onSuccess: async () => {
            await this.fetchRegistrations();
          },
          onError: () => false, // Optional: handle specific error logic
        },
      );
    },

    // Helper to simulate admin action
    async updateStatus(registrationId: number, status: 'accepted' | 'rejected') {
      return apiExecutor<void>(
        this.updateStatusState,
        () => api.post(`/exam/registrations/${registrationId}/status`, { status }),
        {
          onSuccess: async () => {
            await this.fetchRegistrations();
          },
        },
      );
    },
  },
});
