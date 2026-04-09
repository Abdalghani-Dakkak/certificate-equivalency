import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ListEndPoint } from 'src/end-point/list-end-point';
import { apiExecutor } from 'src/shared/apiExecutor';
import { createApiState } from 'src/shared/apiState';
import type { TableModel } from 'src/shared/shared';
import { createListModel } from 'src/shared/shared-function';

export const useListStore = defineStore('list', {
  state: () => ({
    lstNationality: createListModel(),
    getNationalityState: createApiState<TableModel[]>(),
    lstDirectorate: createListModel(),
    getDirectorateState: createApiState<TableModel[]>(),
    lstCongregation: createListModel(),
    getCongregationState: createApiState<TableModel[]>(),
    lstCertificateLanguage: createListModel(),
    getCertificateLanguageState: createApiState<TableModel[]>(),
    lstClassName: createListModel(),
    getClassNameState: createApiState<TableModel[]>(),
    lstReligion: createListModel(),
    getReligionState: createApiState<TableModel[]>(),
    lstDocumentType: createListModel(),
    getDocumentTypeState: createApiState<TableModel[]>(),
    lstCertificateSource: createListModel(),
    getCertificateSourceState: createApiState<TableModel[]>(),
    lstFreeSchool: createListModel(),
    getFreeSchoolState: createApiState<TableModel[]>(),
    lstRegistrationCertificate: createListModel(),
    getRegistrationCertificateState: createApiState<TableModel[]>(),
  }),
  actions: {
    async getNationality() {
      return apiExecutor(this.getNationalityState, () => api.get(ListEndPoint.getNationality),
      {
        beforeStart: () => {
          this.lstNationality.start();
        },
        onSuccess: (data) => {
          this.lstNationality.data = data;
        },
        onFinally: () => {
          this.lstNationality.finish();
        },
      }
    );
    },
    async getDocumentType() {
      return apiExecutor(this.getDocumentTypeState, () => api.get(ListEndPoint.getDocumentType),
      {
        beforeStart: () => {
          this.lstDocumentType.start();
        },
        onSuccess: (data) => {
          this.lstDocumentType.data = data;
        },
        onFinally: () => {
          this.lstDocumentType.finish();
        },
      }
    );
    },
    async getFreeSchool(congregationId: number) {
      if (!congregationId) return;
      return apiExecutor(this.getFreeSchoolState, () => api.get(`${ListEndPoint.getFreeSchool}/${congregationId}`),
      {
        beforeStart: () => {
          this.lstFreeSchool.start();
        },
        onSuccess: (data) => {
          this.lstFreeSchool.data = data;
        },
        onFinally: () => {
          this.lstFreeSchool.finish();
        },
      }
    );
    },
    async getCertificateSource() {
      return apiExecutor(this.getCertificateSourceState, () => api.get(ListEndPoint.getCertificateSource),
      {
        beforeStart: () => {
          this.lstCertificateSource.start();
        },
        onSuccess: (data) => {
          this.lstCertificateSource.data = data;
        },
        onFinally: () => {
          this.lstCertificateSource.finish();
        },
      }
    );
    },
    async getReligion() {
      return apiExecutor(this.getReligionState, () => api.get(ListEndPoint.getReligion),
      {
        beforeStart: () => {
          this.lstReligion.start();
        },
        onSuccess: (data) => {
          this.lstReligion.data = data;
        },
        onFinally: () => {
          this.lstReligion.finish();
        },
      }
    );
    },
    async getDirectorate() {
      return apiExecutor(this.getDirectorateState, () => api.get(ListEndPoint.getDirectorate),
      {
        beforeStart: () => {
          this.lstDirectorate.start();
        },
        onSuccess: (data) => {
          this.lstDirectorate.data = data;
        },
        onFinally: () => {
          this.lstDirectorate.finish();
        },
      }
    );
    },
    async getCongregation(directorateId: number) {
      if (!directorateId) return;
      return apiExecutor(this.getCongregationState, () => api.get(`${ListEndPoint.getCongregation}/${directorateId}`),
      {
        beforeStart: () => {
          this.lstCongregation.start();
        },
        onSuccess: (data) => {
          this.lstCongregation.data = data;
        },
        onFinally: () => {
          this.lstCongregation.finish();
        },
      }
    );
    },
    async getCertificateLanguageByExaminationPeriod(examinationPeriodId: number) {
      if (!examinationPeriodId) return;
      return apiExecutor(this.getCertificateLanguageState, () => api.get(`${ListEndPoint.getCertificateLanguageByExaminationPeriod}/${examinationPeriodId}`),
      {
        beforeStart: () => {
          this.lstCertificateLanguage.start();
        },
        onSuccess: (data) => {
          this.lstCertificateLanguage.data = data;
        },
        onFinally: () => {
          this.lstCertificateLanguage.finish();
        },
      }
    );
    },
    async getClassNameExaminationPeriod(examinationPeriodId: number) {
      if (!examinationPeriodId) return;
      return apiExecutor(this.getClassNameState, () => api.get(`${ListEndPoint.getClassNameExaminationPeriod}/${examinationPeriodId}`), {
        beforeStart: () => {
          this.lstClassName.start();
        },
        onSuccess: (data) => {
          this.lstClassName.data = data;
        },
        onFinally: () => {
          this.lstClassName.finish();
        },
      });
    },
    async getRegistrationCertificate() {
      return apiExecutor(this.getRegistrationCertificateState, () => api.get(ListEndPoint.getRegistrationCertificate), {
        beforeStart: () => {
          this.lstRegistrationCertificate.start();
        },
        onSuccess: (data) => {
          this.lstRegistrationCertificate.data = data;
        },
        onFinally: () => {
          this.lstRegistrationCertificate.finish();
        },
      });
    },
  },
});
