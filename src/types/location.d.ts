export interface LocationModel {
  id: number;
  name: string;
  father_id: number;
  idBool: boolean | null;
  uuid: string;
  branch_for: number | null;
  code?: string;
  idref?: number;
}
