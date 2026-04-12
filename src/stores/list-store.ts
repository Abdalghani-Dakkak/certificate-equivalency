import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ListEndPoint } from 'src/end-point/list-end-point';
import { apiExecutor } from 'src/shared/apiExecutor';
import { createApiState } from 'src/shared/apiState';
import type { TableModel } from 'src/shared/shared';
import { createListModel } from 'src/shared/shared-function';

type ApiListResponse = {
  success?: boolean;
  data?: TableModel[];
};

function unwrapListData(payload: TableModel[] | ApiListResponse | null | undefined): TableModel[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export const useListStore = defineStore('list', {
  state: () => ({
    lstNationality: createListModel(),
    getNationalityState: createApiState<TableModel[]>(),
    lstDirectorate: createListModel(),
    getDirectorateState: createApiState<TableModel[]>(),
    lstDocumentType: createListModel(),
    getDocumentTypeState: createApiState<TableModel[]>(),
    lstCertificateSource: createListModel(),
    getCertificateSourceState: createApiState<TableModel[]>(),
    lstRegistrationCertificate: createListModel(),
    getRegistrationCertificateState: createApiState<TableModel[]>(),
  }),
  actions: {
    async getNationality() {
      return apiExecutor(this.getNationalityState, () => api.get(ListEndPoint.getNationality), {
        beforeStart: () => {
          this.lstNationality.start();
        },
        transform: unwrapListData,
        onSuccess: (data) => {
          this.lstNationality.data = data;
          this.lstNationality.filtered = data;
        },
        onFinally: () => {
          this.lstNationality.finish();
        },
      });
    },

    async getDocumentType() {
      return apiExecutor(this.getDocumentTypeState, () => api.get(ListEndPoint.getDocumentType), {
        beforeStart: () => {
          this.lstDocumentType.start();
        },
        transform: unwrapListData,
        onSuccess: (data) => {
          this.lstDocumentType.data = data;
          this.lstDocumentType.filtered = data;
        },
        onFinally: () => {
          this.lstDocumentType.finish();
        },
      });
    },

    async getCertificateSource() {
      return apiExecutor(this.getCertificateSourceState, () => api.get(ListEndPoint.getCertificateSource), {
        beforeStart: () => {
          this.lstCertificateSource.start();
        },
        transform: unwrapListData,
        onSuccess: (data) => {
          this.lstCertificateSource.data = data;
          this.lstCertificateSource.filtered = data;
        },
        onFinally: () => {
          this.lstCertificateSource.finish();
        },
      });
    },

    async getDirectorate() {
      return apiExecutor(this.getDirectorateState, () => api.get(ListEndPoint.getDirectorate), {
        beforeStart: () => {
          this.lstDirectorate.start();
        },
        transform: unwrapListData,
        onSuccess: (data) => {
          this.lstDirectorate.data = data;
          this.lstDirectorate.filtered = data;
        },
        onFinally: () => {
          this.lstDirectorate.finish();
        },
      });
    },

    async getRegistrationCertificate(countryId?: number | string | null) {
      if (!countryId) {
        this.lstRegistrationCertificate.reset();
        this.getRegistrationCertificateState.reset();
        return [];
      }

      return apiExecutor(
        this.getRegistrationCertificateState,
        () => api.get(`${ListEndPoint.getRegistrationCertificate}/${countryId}`),
        {
          beforeStart: () => {
            this.lstRegistrationCertificate.start();
          },
          transform: unwrapListData,
          onSuccess: (data) => {
            this.lstRegistrationCertificate.data = data;
            this.lstRegistrationCertificate.filtered = data;
          },
          onFinally: () => {
            this.lstRegistrationCertificate.finish();
          },
        }
      );
    },
  },
});