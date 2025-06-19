export const Status = {
  Ongoing: "Ongoing",
  Finished: "Finished",
  Trash: "Trash",
  Delete: "Delete",
} as const;

export type Status = keyof typeof Status;

export interface AllTasksResponse {
  message: string;
  data: AllTasksDatum[];
}

export interface AllTasksDatum {
  id: string;
  name: string;
  status: Status;
  description: null;
  deadline: null;
  createdAt: Date;
  updatedAt: Date;
  todoId: string;
}

// ---------------------------------
export interface TaskByTabIdResponse {
  message: string;
  data: TaskByTabIdDatum[];
}

export interface TaskByTabIdDatum {
  id: string;
  name: string;
  status: Status;
  description: null | string;
  deadline: null | Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskCreateResponse {
  message: string;
  data: TaskCreateData;
}

export interface TaskCreateData {
  id: string;
  name: string;
  status: string;
  description: string;
  deadline: null | Date;
  todoId: string;
  createdAt: Date;
  updatedAt: Date;
  Todo: TaskCreateTodoData;
}

export interface TaskCreateTodoData {
  id: string;
  title: string;
}

export interface TaskUpdateResponse {
  message: string;
  data: TaskUpdateData;
}

export interface TaskUpdateData {
  id: string;
  name: string;
  status: string;
  description: string;
  deadline: Date | null;
  createdAt: Date;
  updatedAt: Date;
  todoId: string;
}

export interface TaskDeleteByIDResponse {
  message: string;
}
