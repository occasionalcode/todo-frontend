export interface TodotabResponse {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  title: string;
  description: null | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoTabByIDResponse {
  message: string;
  data: TodoTabByIdData;
}

export interface TodoTabByIdData {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
