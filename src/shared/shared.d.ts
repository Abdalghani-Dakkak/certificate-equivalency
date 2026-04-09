import type { LocationModel } from 'src/types/location';

export interface TableModel {
  id: number;
  name: string;
  father_id: number;
  idBool: boolean | null;
  uuid: string;
  branch_for: number | null;
  code?: string;
  idref?: number;
}

export interface ListModel {
  data: (TableModel | LocationModel)[];
  filtered: (TableModel | LocationModel)[];
  selected: TableModel | LocationModel | null | undefined;
  lstselected: (TableModel | LocationModel)[] | null;
  loading: boolean;
  error: string;
  isError: boolean;
  reset: () => void;
  start: () => void;
  finish: () => void;
}

export interface QFormInstance {
  validate: () => Promise<boolean>; // Now returns a Promise
  resetValidation: () => void;
  reset: () => void;
}
export interface ApiEndpoint<T> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // You can add more methods as needed
  body?: T; // Optional, since not every request will have data (e.g., GET requests)
}
//const form = ref<QFormInstance | null>(null);
