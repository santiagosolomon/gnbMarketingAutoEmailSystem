import { create } from "zustand";

export const useStore = create((set) => ({
  bar: true,
  setBar: (state) => set({ bar: state }),
}));
