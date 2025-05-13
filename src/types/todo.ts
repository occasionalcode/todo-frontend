export interface TodoResponse {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
// ----------
export interface TodoByTabIdResponse {
  message: string;
  data: TodoByTabIdData[];
}

export interface TodoByTabIdData {
  id: string;
  title: string;
  description: null | string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  ongoingCount: number;
  finishedCount: number;
  taskCount: number;
}

//---------------------------------------

export interface TodoByIdResponse {
  message: string;
  data: TodoByIdData;
}

export interface TodoByIdData {
  id: string;
  title: string;
  description: null;
  status: string;
  todoTabId: string;
  createdAt: Date;
  updatedAt: Date;
  TodoTab: TodoTab;
}

export interface TodoTab {
  id: string;
  title: string;
  description: null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
