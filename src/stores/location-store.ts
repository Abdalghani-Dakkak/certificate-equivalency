import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { LOCATION_ENDPOINT } from 'src/end-point/location-end-point';
import type { LocationModel } from 'src/types/location';
import { apiExecutor } from 'src/shared/apiExecutor';
import { createApiState } from 'src/shared/apiState';
import { createListModel } from 'src/shared/shared-function';

export const useLocationStore = defineStore('location', {
  state: () => ({
    lstGovernorate: createListModel(),
    getGovernorateState: createApiState<void>(),

    lstDistrict: createListModel(),
    getDistrictState: createApiState<void>(),

    lstSubdistrict: createListModel(),
    getSubdistrictState: createApiState<void>(),

    lstCommunity: createListModel(),
    getCommunityState: createApiState<void>(),

    lstSection: createListModel(),
    getSectionState: createApiState<void>(),

    lstPart: createListModel(),
    getPartState: createApiState<void>(),

    lstBuild: createListModel(),
    getBuildState: createApiState<void>(),

    lstFloor: createListModel(),
    getFloorState: createApiState<void>(),

    lstFlat: createListModel(),
    getFlatState: createApiState<void>(),
  }),
  actions: {
    getGovernorate() {
      return apiExecutor(
        this.getGovernorateState,
        () => api.get(LOCATION_ENDPOINT.getGovernorate.route),
        {
          beforeStart: () => {
            this.lstGovernorate.start();
          },
          onSuccess: (data) => {
            this.lstGovernorate.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstGovernorate.finish();
          },
        },
      );
    },
    getDistrict(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getDistrictState,
        () => api.get(`${LOCATION_ENDPOINT.getDistrict.route}/${id}`),
        {
          beforeStart: () => {
            this.lstDistrict.start();
          },
          onSuccess: (data) => {
            this.lstDistrict.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstDistrict.finish();
          },
        },
      );
    },
    getSubdistrict(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getSubdistrictState,
        () => api.get(`${LOCATION_ENDPOINT.getSubdistrict.route}/${id}`),
        {
          beforeStart: () => {
            this.lstSubdistrict.start();
          },
          onSuccess: (data) => {
            this.lstSubdistrict.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstSubdistrict.finish();
          },
        },
      );
    },
    getCommunity(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getCommunityState,
        () => api.get(`${LOCATION_ENDPOINT.getCommunity.route}/${id}`),
        {
          beforeStart: () => {
            this.lstCommunity.start();
          },
          onSuccess: (data) => {
            this.lstCommunity.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstCommunity.finish();
          },
        },
      );
    },
    getSection(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getSectionState,
        () => api.get(`${LOCATION_ENDPOINT.getSection.route}/${id}`),
        {
          beforeStart: () => {
            this.lstSection.start();
          },
          onSuccess: (data) => {
            this.lstSection.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstSection.finish();
          },
        },
      );
    },
    getPart(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getPartState,
        () => api.get(`${LOCATION_ENDPOINT.getPart.route}/${id}`),
        {
          beforeStart: () => {
            this.lstPart.start();
          },
          onSuccess: (data) => {
            this.lstPart.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstPart.finish();
          },
        },
      );
    },
    getBuild(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getBuildState,
        () => api.get(`${LOCATION_ENDPOINT.getBuild.route}/${id}`),
        {
          beforeStart: () => {
            this.lstBuild.start();
          },
          onSuccess: (data) => {
            this.lstBuild.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstBuild.finish();
          },
        },
      );
    },
    getFloor(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getFloorState,
        () => api.get(`${LOCATION_ENDPOINT.getFloor.route}/${id}`),
        {
          beforeStart: () => {
            this.lstFloor.start();
          },
          onSuccess: (data) => {
            this.lstFloor.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstFloor.finish();
          },
        },
      );
    },
    getFlat(id: number) {
      if (!id) return;
      return apiExecutor(
        this.getFlatState,
        () => api.get(`${LOCATION_ENDPOINT.getFlat.route}/${id}`),
        {
          beforeStart: () => {
            this.lstFlat.start();
          },
          onSuccess: (data) => {
            this.lstFlat.data = data as unknown as LocationModel[];
          },
          onFinally: () => {
            this.lstFlat.finish();
          },
        },
      );
    },
  },
});
