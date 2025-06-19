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
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoTabCreateResponse {
  message: string;
  data: TodoTabCreateData;
}

export interface TodoTabCreateData {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoTabUpdateResponse {
  message: string;
  data: TodoTabUpdateData;
}

export interface TodoTabUpdateData {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
