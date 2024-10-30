import { create } from "zustand";

const usePondStore = create((set) => ({
  ponds: [],
  setPonds: (newPonds) => {
    if (Array.isArray(newPonds)) {
      set({ ponds: newPonds });
    } else {
      console.error("setPonds expects an array");
    }
  },
  addPond: (newPond) => {
    set((state) => ({
      ponds: [...state.ponds, newPond],
    }));
  },
  updatePond: (updatedPond) => {
    set((state) => ({
      ponds: state.ponds.map((p) =>
        p.id === updatedPond.id ? updatedPond : p
      ),
    }));
  },
  deletePond: (id) => {
    set((state) => ({
      ponds: state.ponds.filter((p) => p.id !== id),
    }));
  },
}));

export default usePondStore;
