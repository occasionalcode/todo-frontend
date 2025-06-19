import { create } from "zustand";

type Values = {
  taskUpdateOpen: boolean;
  createTaskOpen: boolean;
};

type Action = {
  setTaskUpdateOpen: (taskUpdateOpen: boolean) => void;
  setCreateTaskOpen: (createTaskOpen: boolean) => void;
};

type Store = Values & Action;

const defaultValues: Values = {
  taskUpdateOpen: false,
  createTaskOpen: false,
};

export const useTaskStore = create<Store>((set) => ({
  ...defaultValues,
  setTaskUpdateOpen: (taskUpdateOpen: boolean) =>
    set({ taskUpdateOpen: taskUpdateOpen }),
  setCreateTaskOpen: (createTaskOpen: boolean) =>
    set({ createTaskOpen: createTaskOpen }),
}));
