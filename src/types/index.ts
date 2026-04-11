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
  profileImageUuid?: string;
  idProofUuid?: string;
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
