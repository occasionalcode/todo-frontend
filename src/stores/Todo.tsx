import { create } from "zustand";

type Values = {
  createTodoOpen: boolean;
};

type Action = {
  setCreateTodoOpen: (createTodoOpen: boolean) => void;
};

type Store = Values & Action;

const defaultValues: Values = {
  createTodoOpen: false,
};

export const useCreateTodoStore = create<Store>((set) => ({
  ...defaultValues,
  setCreateTodoOpen: (createTodoOpen: boolean) =>
    set({ createTodoOpen: createTodoOpen }),
}));
