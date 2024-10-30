import { create } from 'zustand';

const useFishStore = create((set) => ({
  fish: [],
  setFish: (newFish) => {
    if (Array.isArray(newFish)) {
      set({ fish: newFish });
    } else {
      console.error("setFish expects an array");
    }
  },
  addFish: (newFish) => {
    set((state) => ({
      fish: [...state.fish, newFish],
    }));
  },
  updateFish: (updatedFish) => {
    set((state) => ({
      fish: state.fish.map((f) => (f.id === updatedFish.id ? updatedFish : f)),
    }));
  },
  deleteFish: (id) => {
    set((state) => ({
      fish: state.fish.filter((f) => f.id !== id),
    }));
  },
}));

export default useFishStore;