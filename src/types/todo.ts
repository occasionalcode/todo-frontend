import type { Status } from "./task";

export interface AllTodoResponse {
  message: string;
  data: AllTodoData[];
}

export interface AllTodoData {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}

// ----------
export interface TodoByTodoTabIdResponse {
  message: string;
  data: TodoByTodoTabIdData[];
}

export interface TodoByTodoTabIdData {
  id: string;
  title: string;
  description: null | string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
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
  status: Status;
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

export interface TodoPostResponse {
  message: string;
  data: TodoPostData;
}

export interface TodoPostData {
  id: string;
  title: string;
  description: string;
  status: Status;
  todoTabId: string;
  createdAt: Date;
  updatedAt: Date;
  TodoTab: TodoTab;
}
