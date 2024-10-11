import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      // check coi product có trong mảng redux của mình chưa
      const existProduct = state.find((koi) => koi.id === product.id);
      // nếu có thì tăng quantity
      if (existProduct) {
        existProduct.quantity += 1;
      }

      // nếu không thì add vô như bth
      else {
        state.push({ ...product, quantity: 1 });
      }
    },
    clearAll: () => [],
  },
});
export const { addProduct, clearAll } = cartSlice.actions;
export default cartSlice.reducer;
