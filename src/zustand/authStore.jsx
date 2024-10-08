import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  isLoginFormOpen: false,
  toggleLoginForm: () => set((state) => ({ isLoginFormOpen: !state.isLoginFormOpen })),
}));

 
export default useAuthStore;