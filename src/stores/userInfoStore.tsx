import { create } from "zustand";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
};

type Action = {
  setLastName: (lastName: string) => void;
  setFirstName: (firstName: string) => void;
  setEmail: (email: string) => void;
};

type Store = Values & Action;

const defaultValues: Values = {
  firstName: "",
  lastName: "",
  email: "",
};

export const useUserInfo = create<Store>((set) => ({
  ...defaultValues,
  setLastName: (lastName: string) => set({ lastName: lastName }),
  setFirstName: (firstName: string) => set({ firstName: firstName }),
  setEmail: (email: string) => set({ email: email }),
}));
