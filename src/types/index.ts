// Student Related Types
export interface FreeStudentInfo {
  first_name: string;
  father_name: string;
  last_name: string;
  grandfather_name: string;
  mother_name: string;
  mother_surname: string;
  place_code: string;
  governorate: string;
  district: string;
  subdistrict: string;
  community: string;
  gender: string;
  nationality_name: string;
  mother_nationality_name: string;
  birth_place: string;
  birth_date: string;
  card_number: string;
  contact_number: string;
  email: string;
  landline_phone_number: string;
  document_type_name: string;
  verification_date: string;
  order_date: string;
  profileImageUuid?: string; // Keep specifically for UI if needed or check where it comes from
  idProofUuid?: string;      // Keep specifically for UI if needed
}

export interface Documents {
  photo: File | null;
  ninthGradeCert: File | null;
  idCard: File | null;
  vocationalSeqDoc: File | null;
}

export interface LoginInfo {
  token: string;
  verification: boolean;
  email: string;
  first_name: string;
  last_name: string;
}

// Exam Related Types
export type CertificateType = 'scientific' | 'literary' | 'vocational' | 'sharia';
export type ExamCycleStatus = 'open' | 'closed';
export type RegistrationStatus = 'unpaid' | 'paid' | 'under_review' | 'accepted' | 'rejected';

export interface ExamCycle {
  id: number;
  name: string;
  start_registration_date: string;
  end_registration_date: string;
  certificate_name: string;
  year_name: string;
  // Optional legacy fields if still needed by UI components temporarily
  fees?: number;
  status?: ExamCycleStatus;
}
export interface FreeStudentExaminationRegistration {
  id: number;
  old_certificate_name: string | null;
  old_certificate_source_name: string | null;
  old_certificate_number: string | null;
  old_certificate_year: string | null;
  healthy: boolean | null;
  student_notes: string | null;
  directorate_name: string | null;
  congregation_name: string | null;
  school_name: string | null;
  religion_name: string | null;
  language_name: string | null;
  order_date: string;
  order_status: string;
  checking_date: string | null;
  class_name: string | null;
  examination_period_name: string;
  payment_code: string | null;
  payment_value: number | null;
  currency_type_name: string | null;
  verification_date: string | null;
  registration_examination_period_code: string | null;
  subscription_number: string | null;
  notes: string | null;
}

export interface RegistrationFreeStudentOrder {
  first_name: string;
  father_name: string;
  last_name: string;
  grandfather_name: string;
  mother_name: string;
  mother_surname: string;
  place_code: string;
  gender:  boolean;
  nationality_id: number;
  mother_nationality_id: number;
  birth_place: string;
  birth_date: string;
  card_number: string;
  contact_number: string;
  email: string;
  landline_phone_number: string;
  password: string;
  document_type_id: number;
  neighborhood?: string;
  address_details?: string;
}

export interface RegistrationInput {
  examination_period_id: string;
  class_name_id: string;
  congregation_id: string;
  school_id: string;
  language_certificate_subject_id: string;
  religion_id: string;
  old_certificate_id?: string;
  old_certificate_source_id?: string;
  old_certificate_number?: string;
  old_certificate_year?: string;
  healthy: boolean;
  student_notes?: string;
}

// Common/System Types
export interface Meta {
  totalCount: number;
  features?: any;
}

export interface Todo {
  id: number;
  content: string;
}

export interface ExaminationPeriodOpened {
  id: number;
  name: string;
  start_registration_date: string;
  end_registration_date: string;
  certificate_name: string;
  year_name: string;
}

// Auth/Login
export interface LoginInfo {
  token: string;
  email: string;
  first_name: string;
  last_name: string;
  verification: boolean;
}
