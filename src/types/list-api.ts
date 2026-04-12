import type { TableModel } from 'src/shared/shared';
import type { ApiSuccessResponse } from './api';

export type NationalityOption = TableModel;
export type DocumentTypeOption = TableModel;
export type CountryOption = TableModel;
export type CountryCertificateOption = TableModel;
export type DirectorateOption = TableModel;

export type NationalitiesResponse = ApiSuccessResponse<NationalityOption[]>;
export type DocumentTypesResponse = ApiSuccessResponse<DocumentTypeOption[]>;
export type CountriesResponse = ApiSuccessResponse<CountryOption[]>;
export type CountryCertificatesResponse = ApiSuccessResponse<CountryCertificateOption[]>;
export type DirectoratesResponse = ApiSuccessResponse<DirectorateOption[]>;
