import type { ApiMessageResponse, ApiSuccessResponse } from './api';

export interface Documents {
  photo: File | null;
  ninthGradeCert: File | null;
  idCard: File | null;
  vocationalSeqDoc: File | null;
}

export interface FormulaStudentAuthData {
  token: string;
  verification: boolean;
  email: string;
  first_name: string;
  last_name: string;
  is_verified?: boolean;
}

export type LoginInfo = FormulaStudentAuthData;

export interface FormulaStudentLoginRequest {
  email: string;
  password: string;
}

export type FormulaStudentLoginResponse = ApiSuccessResponse<FormulaStudentAuthData>;

export interface FormulaStudentSendVerificationRequest {
  token: string;
}

export type FormulaStudentSendVerificationResponse = ApiMessageResponse;

export interface FormulaStudentVerifyRequest {
  verification_code: string;
  token: string;
}

export interface FormulaStudentVerifyData {
  verified?: boolean;
}

export type FormulaStudentVerifyResponse =
  | ApiSuccessResponse<FormulaStudentVerifyData>
  | ApiMessageResponse;

export interface FormulaStudentRegisterRequest {
  first_name: string;
  father_name: string;
  last_name: string;
  mother_name: string;
  mother_last_name: string;
  birth_date: string;
  nationality_id: number;
  mother_nationality_id: number;
  document_type_id: number;
  document_number: string;
  gender: boolean;
  phone_number: string;
  email: string;
  password: string;
  photo_token: string;
  document_token: string;
  asylum_date: string | null;
  study_sequence: boolean;
  certificate_number: string;
  grant_year: number;
  rate: number;
  formula_id: number;
  directorate_id: number;
}

export type FormulaStudentRegisterResponse = ApiSuccessResponse<FormulaStudentAuthData>;

export interface FormulaStudentProfile {
  id?: number;
  first_name: string;
  father_name: string;
  last_name: string;
  mother_name: string;
  mother_last_name: string;
  birth_date: string;
  nationality_id: number;
  mother_nationality_id: number;
  document_type_id: number;
  document_number: string;
  gender: boolean;
  phone_number: string;
  email: string;
  photo_token?: string | null;
  document_token?: string | null;
  asylum_date: string | null;
  study_sequence: boolean;
  certificate_number: string;
  grant_year: number;
  rate: number;
  formula_id: number;
  directorate_id: number;
  verification?: boolean;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type FormulaStudentProfileResponse = ApiSuccessResponse<FormulaStudentProfile>;