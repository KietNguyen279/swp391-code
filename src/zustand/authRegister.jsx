import {create} from 'zustand';

const useRegister = create((set) => ({
  isRegisterFormOpen: false,
  toggleRegisterForm: () => set((state) => ({ isRegisterFormOpen: !state.isRegisterFormOpen })),
}));
export default useRegister